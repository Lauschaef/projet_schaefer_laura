<?php



use Doctrine\ORM\Mapping as ORM;

/**
 * Book
 *
 * @ORM\Table(name="book")
 * @ORM\Entity
 */
class Book
{
    /**
     * @var int
     *
     * @ORM\Column(name="idbook", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="SEQUENCE")
     * @ORM\SequenceGenerator(sequenceName="book_idbook_seq", allocationSize=1, initialValue=1)
     */
    private $idbook;

    /**
     * @var string
     *
     * @ORM\Column(name="ref", type="string", length=255, nullable=false)
     */
    private $ref;

    /**
     * @var string
     *
     * @ORM\Column(name="title", type="string", length=255, nullable=false)
     */
    private $title;

    /**
     * @var string
     *
     * @ORM\Column(name="author", type="string", length=255, nullable=false)
     */
    private $author;

    /**
     * @var float
     *
     * @ORM\Column(name="popularity", type="float", precision=10, scale=0, nullable=false)
     */
    private $popularity;

    /**
     * @var float
     *
     * @ORM\Column(name="price", type="float", precision=10, scale=0, nullable=false)
     */
    private $price;

    /**
     * @var string
     *
     * @ORM\Column(name="image", type="string", length=255, nullable=false)
     */
    private $image;

    /**
     * @var int
     *
     * @ORM\Column(name="idgender", type="integer", nullable=false)
     */
    private $idgender;


    /**
     * Get idbook.
     *
     * @return int
     */
    public function getIdbook()
    {
        return $this->idbook;
    }

    /**
     * Set ref.
     *
     * @param string $ref
     *
     * @return Book
     */
    public function setRef($ref)
    {
        $this->ref = $ref;

        return $this;
    }

    /**
     * Get ref.
     *
     * @return string
     */
    public function getRef()
    {
        return $this->ref;
    }

    /**
     * Set title.
     *
     * @param string $title
     *
     * @return Book
     */
    public function setTitle($title)
    {
        $this->title = $title;

        return $this;
    }

    /**
     * Get title.
     *
     * @return string
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * Set author.
     *
     * @param string $author
     *
     * @return Book
     */
    public function setAuthor($author)
    {
        $this->author = $author;

        return $this;
    }

    /**
     * Get author.
     *
     * @return string
     */
    public function getAuthor()
    {
        return $this->author;
    }

    /**
     * Set popularity.
     *
     * @param float $popularity
     *
     * @return Book
     */
    public function setPopularity($popularity)
    {
        $this->popularity = $popularity;

        return $this;
    }

    /**
     * Get popularity.
     *
     * @return float
     */
    public function getPopularity()
    {
        return $this->popularity;
    }

    /**
     * Set price.
     *
     * @param float $price
     *
     * @return Book
     */
    public function setPrice($price)
    {
        $this->price = $price;

        return $this;
    }

    /**
     * Get price.
     *
     * @return float
     */
    public function getPrice()
    {
        return $this->price;
    }

    /**
     * Set image.
     *
     * @param string $image
     *
     * @return Book
     */
    public function setImage($image)
    {
        $this->image = $image;

        return $this;
    }

    /**
     * Get image.
     *
     * @return string
     */
    public function getImage()
    {
        return $this->image;
    }

    /**
     * Set idgender.
     *
     * @param int $idgender
     *
     * @return Book
     */
    public function setIdgender($idgender)
    {
        $this->idgender = $idgender;

        return $this;
    }

    /**
     * Get idgender.
     *
     * @return int
     */
    public function getIdgender()
    {
        return $this->idgender;
    }
}
