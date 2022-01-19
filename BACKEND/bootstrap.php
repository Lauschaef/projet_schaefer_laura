<?php
use Doctrine\ORM\Tools\Setup;
use Doctrine\ORM\EntityManager;

require_once "vendor/autoload.php";

$isDevMode = false;
$conn;

if($isDevMode){
    $conn = array(
        'host' => '127.0.0.1',
        'driver' => 'pdo_mysql',
        'user' => 'root',
        'password' => 'root',
        'dbname' => 'dbMet02',
        'port' => '3306'
        );
} else {
    $conn = array(
    'host' => 'ec2-52-207-163-202.compute-1.amazonaws.com',
    'driver' => 'pdo_pgsql',
    'user' => 'oxdntlwmneyakw',
    'password' => 'c255e9d7a765228ef4a7dd58c6120435610cc91d359e684e45abd53a6c57f6c6',
    'dbname' => 'dtdkos24uoqre',
    'port' => '5432'
    );
}


$config = Setup::createYAMLMetadataConfiguration(array(__DIR__ . "/config/yaml"), $isDevMode);

$entityManager = EntityManager::create($conn, $config);

