<?php



use Doctrine\ORM\Mapping as ORM;

/**
 * OrderContent
 *
 * @ORM\Table(name="order_content")
 * @ORM\Entity
 */
class OrderContent
{
    /**
     * @var int
     *
     * @ORM\Column(name="idorder", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="NONE")
     */
    private $idorder;

    /**
     * @var int
     *
     * @ORM\Column(name="idbook", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="NONE")
     */
    private $idbook;

    /**
     * @var int
     *
     * @ORM\Column(name="quantity", type="integer", nullable=false)
     */
    private $quantity;


    /**
     * Set idorder.
     *
     * @param int $idorder
     *
     * @return OrderContent
     */
    public function setIdorder($idorder)
    {
        $this->idorder = $idorder;

        return $this;
    }

    /**
     * Get idorder.
     *
     * @return int
     */
    public function getIdorder()
    {
        return $this->idorder;
    }

    /**
     * Set idbook.
     *
     * @param int $idbook
     *
     * @return OrderContent
     */
    public function setIdbook($idbook)
    {
        $this->idbook = $idbook;

        return $this;
    }

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
     * Set quantity.
     *
     * @param int $quantity
     *
     * @return OrderContent
     */
    public function setQuantity($quantity)
    {
        $this->quantity = $quantity;

        return $this;
    }

    /**
     * Get quantity.
     *
     * @return int
     */
    public function getQuantity()
    {
        return $this->quantity;
    }
}
