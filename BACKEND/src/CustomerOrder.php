<?php



use Doctrine\ORM\Mapping as ORM;

/**
 * CustomerOrder
 *
 * @ORM\Table(name="customer_order")
 * @ORM\Entity
 */
class CustomerOrder
{
    /**
     * @var int
     *
     * @ORM\Column(name="idorder", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="SEQUENCE")
     * @ORM\SequenceGenerator(sequenceName="customer_order_idorder_seq", allocationSize=1, initialValue=1)
     */
    private $idorder;

    /**
     * @var int
     *
     * @ORM\Column(name="idclient", type="integer", nullable=false)
     */
    private $idclient;

    /**
     * @var string|null
     *
     * @ORM\Column(name="date", type="string", length=255, nullable=true)
     */
    private $date;


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
     * Set idclient.
     *
     * @param int $idclient
     *
     * @return CustomerOrder
     */
    public function setIdclient($idclient)
    {
        $this->idclient = $idclient;

        return $this;
    }

    /**
     * Get idclient.
     *
     * @return int
     */
    public function getIdclient()
    {
        return $this->idclient;
    }

    /**
     * Set date.
     *
     * @param string|null $date
     *
     * @return CustomerOrder
     */
    public function setDate($date = null)
    {
        $this->date = $date;

        return $this;
    }

    /**
     * Get date.
     *
     * @return string|null
     */
    public function getDate()
    {
        return $this->date;
    }
}
