<?php
    use Psr\Http\Message\ResponseInterface as Response;
    use Psr\Http\Message\ServerRequestInterface as Request;
    use Slim\Factory\AppFactory;
    
    use Tuupola\Middleware\HttpBasicAuthentication;
    use \Firebase\JWT\JWT;
    
    require __DIR__ . '/../vendor/autoload.php';
    require_once __DIR__ . '/../bootstrap.php';

    const JWT_SECRET = "tp05JWTKey";

    $options = [
        'attribute' => 'token',
        'header' => 'Authorization',
        'regexp' => "/Bearer\s+(.*)$/i",
        'secure' => false,
        'algorithm' => ['HS256'],
        'secret' => JWT_SECRET,
        'path' => ['/api'],
        'ignore' => ["/api/auth", "/api/login", "/api/create_user", "/api/getBooks", "/api/getBookByRef", "/api/getClientHistory", "/api/saveOrder"],
        "error" => function ($response, $arguments) {
            $data = array("ERREUR" => "Connexion", "Erreur" => "JWT Non valide");
            $response = $response->withStatus(401);
            return $response->withHeader("Content-Type", "application/json")->getBody()->write(json_encode($data));
        }
    ];

    function createJWT(Response $response) : Response {
        $issuedAt = time();
        $expirationTime = $issuedAt + 600;
        $payload = array(
            'iat' => $issuedAt,
            'exp' => $expirationTime
        );

        $token_jwt = JWT::encode($payload, JWT_SECRET, "HS256");
        $response = $response->withHeader("Authorization","Bearer {$token_jwt}");

        return $response;
    }

    function addHeaders(Response $response) : Response {
        $response = $response
        ->withHeader("Content-Type","application/json")
        ->withHeader("Access-Control-Allow-Origin", "*")
        ->withHeader("Access-Control-Allow-Headers", "*")
        ->withHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS")
        ->withHeader('Access-Control-Allow-Credentials', 'true')
        ->withHeader("Access-Control-Expose-Headers", "*");
       
        return $response;
    }
    
    $app = AppFactory::create();

    session_start();

    // $app->get('/api/auth/{login}',
    //     function(Request $request, Response $response, $args){
    //         $login = $args['login'];
    //         if($login){
    //             $data = array('login' => $login);
    //             $response = addHeaders($response);
    //             $response = createJWT($response);
    //             $response->getBody()->write(json_encode($data));
    //         } else {
    //             $response = $response->withStatus(401);
    //         }
    //         return $response;
    //     }
    // );

// ***** CUSTOMER ***** //    

    $app->post('/api/login',
        function(Request $request, Response $response, $args){
            global $entityManager;
            $error = false;
            $body = $request->getParsedBody();
            $login = $body['login']??"";
            $password = $body['password']??"";
            if (!preg_match("/[a-zA-Z0-9]{1,20}/",$login)){
                $error = true;
            }
            if (!preg_match("/[a-zA-Z0-9]{1,20}/",$password)){
                $error = true;
            }
            if(!$error){
                $userRepository = $entityManager->getRepository('Customer');
                $user = $userRepository->findOneBy(array('login' => $login, 'password' => $password));
                if($user && $user->getLogin() == $login && $user->getPassword() == $password){
                    $response = addHeaders ($response);
                    $response = createJwT ($response);

                    $_SESSION['idConnectedUser'] = $user->getIduser();

                    $connectedUser = [
                        'civility' => $user->getCivility(),
                        'firstname' => $user->getFirstname(),
                        'lastname' => $user->getLastname(),
                        'adress' => $user->getAdress(),
                        'cp' => $user->getPostcode(),
                        'city' => $user->getCity(),
                        'country' => $user->getCountry(),
                        'phoneNumber' => $user->getPhonenumber(),
                        'email' => $user->getEmail(),
                        'login' => $user->getLogin(),
                        'password' => $user->getPassword()
                    ];

                    $response->getBody()->write(json_encode($connectedUser));
                    $response = $response->withStatus(200);

                } else {
                    $response = $response->withStatus(401);
                }
            } else {
                $response = $response->withStatus(403);
            }
            return $response;
        }
    );

    $app->post('/api/create_user',
        function(Request $request, Response $response, $args){
            global $entityManager;
            $body = $request->getParsedBody();
            $civility = $body['civility']??"";
            $lastname = $body['lastname']??"";
            $firstname = $body['firstname']??"";
            $adress = $body['adress']??"";
            $postCode = $body['postCode']??"";
            $city = $body['city']??"";
            $country = $body['country']??"";
            $phoneNumber = $body['phoneNumber']??"";
            $email = $body['email']??"";
            $login = $body['login']??"";
            $password = $body['password']??"";

            $userRepository = $entityManager->getRepository('Customer');
            $otherUserWithSameLogin = $userRepository->findOneBy(array('login' => $login));
            if($otherUserWithSameLogin){
                return $response->withStatus(403);
            }

            $newUser = new Customer;
            $newUser->setCivility($civility);
            $newUser->setFirstname($firstname);
            $newUser->setLastname($lastname);
            $newUser->setAdress($adress);
            $newUser->setPostcode($postCode);
            $newUser->setCity($city);
            $newUser->setCountry($country);
            $newUser->setPhonenumber($phoneNumber);
            $newUser->setEmail($email);
            $newUser->setLogin($login);
            $newUser->setPassword($password);
 
            $entityManager->persist($newUser);
            $entityManager->flush();

            $connectedUser = [
                'civility' => $civility,
                'firstname' => $firstname,
                'lastname' => $lastname,
                'adress' => $adress,
                'cp' => $postCode,
                'city' => $city,
                'country' => $country,
                'phoneNumber' => $phoneNumber,
                'email' => $email,
                'login' => $login,
                'password' => $password
            ];

            $dateUser = $userRepository->findOneBy(array('login' => $login));
            $_SESSION['idConnectedUser'] = $dateUser->getIduser();

            $response->getBody()->write(json_encode($connectedUser));
            return $response->withStatus(200);
        }
    ); 

// ***** BOOKS ***** //    

     $app->get('/api/getBooks',
        function(Request $request, Response $response, $args){
            global $entityManager;

            $bookRepository = $entityManager->getRepository('Book');
            $dataBooks = $bookRepository->findAll();

            $genderRepository = $entityManager->getRepository('Gender');

            if(!$dataBooks){
                return $response->withStatus(204);
            }

            $books = [];
            foreach($dataBooks as $book){
                $gender = $genderRepository->findOneBy(array('idgender' => $book->getIdgender()));

                $books[] = [
                    'reference' => $book->getRef(),
                    'title' => $book->getTitle(),
                    'author' => $book->getAuthor(),
                    'popularity' => $book->getPopularity(), 
                    'price' => $book->getPrice(),
                    'image' => $book->getImage(), 
                    'gender' => $gender->getGender() 
                ];
            }
            $response->getBody()->write(json_encode($books));
            return $response->withStatus(200);
        }
    );

    $app->post('/api/getBookByRef',
        function(Request $request, Response $response, $args){
            global $entityManager;

            $body = $request->getParsedBody();
            $ref = $body['ref']??"";

            $bookRepository = $entityManager->getRepository('Book');
            $dataBook = $bookRepository->findOneBy(array('ref' => $ref));

            $genderRepository = $entityManager->getRepository('Gender');

            if(!$dataBook){
                return $response->withStatus(204);
            }

            $gender = $genderRepository->findOneBy(array('idgender' => $dataBook->getIdgender()));

            $book = [
                'reference' => $dataBook->getRef(),
                'title' => $dataBook->getTitle(),
                'author' => $dataBook->getAuthor(),
                'popularity' => $dataBook->getPopularity(), 
                'price' => $dataBook->getPrice(),
                'image' => $dataBook->getImage(), 
                'gender' => $gender->getGender() 
            ];

            $response->getBody()->write(json_encode($book));
            return $response->withStatus(200);
        }
    );

// ***** ORDER HISTORY ***** //

    $app->post('/api/getClientHistory',
        function(Request $request, Response $response, $args){
            global $entityManager;

            $body = $request->getParsedBody();
            $login = $body['login']??"";

            $userRepository = $entityManager->getRepository('Customer');
            $orderRepository = $entityManager->getRepository('CustomerOrder');
            $orderContentRepository = $entityManager->getRepository('OrderContent');
            $bookRepository = $entityManager->getRepository('Book');
            $genderRepository = $entityManager->getRepository('Gender');

            $dataUser = $userRepository->findOneBy(array('login' => $login));
            $dataOrder = $orderRepository->findBy(array('idclient' => $dataUser->getIduser()));

            if(!$dataOrder){
                return $response->withStatus(204);
            }

            $orders = [];
            foreach($dataOrder as $order){
                $dataOrderContent = $orderContentRepository->findBy(array('idorder' => $order->getIdorder()));

                $orderContents = [];
                foreach($dataOrderContent as $orderContent){
                    $dataBook = $bookRepository->findOneBy(array('idbook' => $orderContent->getIdbook()));
                    $dataGender = $genderRepository->findOneBy(array('idgender' => $dataBook->getIdgender()));

                    $book = [
                        'reference' => $dataBook->getRef(),
                        'title' => $dataBook->getTitle(),
                        'author' => $dataBook->getAuthor(),
                        'popularity' => $dataBook->getPopularity(), 
                        'price' => $dataBook->getPrice(),
                        'image' => $dataBook->getImage(), 
                        'gender' => $dataGender->getGender() 
                    ];

                    $orderContents[] = [
                        'book' => $book,
                        'quantity' => $orderContent->getQuantity(),
                    ];
                }

                $orders[] = [
                    'idOrder' => $order->getIdorder(),
                    'date' => $order->getDate(),
                    'content' => $orderContents
                ];
            }

            $response->getBody()->write(json_encode($orders));
            return $response->withStatus(200);
        }
    );

    $app->post('/api/saveOrder',
        function(Request $request, Response $response, $args){
        global $entityManager;

        $idUser = $_SESSION['idConnectedUser'];

        $body = $request->getParsedBody();
        $json = $body['order'] ?? "";

        $bookRepository = $entityManager->getRepository('Book');
        $orderRepository = $entityManager->getRepository('CustomerOrder');

        try {
            $data = json_decode($json, true);
        } catch (Exception $e) {
            return $response->withStatus(400);
        }
        
        $contents = $data['content'];
        
        if(!$contents) {
            return $response->withStatus(400);
        }

        $newOrder = new CustomerOrder;
        $newOrder->setIdclient($idUser);
        $newOrder->setDate($data['date']);

        $entityManager->persist($newOrder);
        $entityManager->flush();

        foreach($contents as $content)
        {
            $book = $content['book'];
            $dataBook = $bookRepository->findOneBy(array('ref' => $book['reference']));
            
            $dataCommandes = $orderRepository->findBy(array('idclient' => $idUser), array('idorder' => 'DESC'));
            $idOrder = $dataCommandes[0]->getIdOrder();

            $newOrderContent = new OrderContent;
            $newOrderContent->setIdorder($idOrder);
            $newOrderContent->setIdbook($dataBook->getIdbook());
            $newOrderContent->setQuantity($content['quantity']);
 
            $entityManager->persist($newOrderContent);
            $entityManager->flush();
        }

        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    });

    $app->add(new Tuupola\Middleware\JwtAuthentication($options));

    $app->run();
?>