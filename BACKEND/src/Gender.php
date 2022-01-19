<?php



use Doctrine\ORM\Mapping as ORM;

/**
 * Gender
 *
 * @ORM\Table(name="gender")
 * @ORM\Entity
 */
class Gender
{
    /**
     * @var int
     *
     * @ORM\Column(name="idgender", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="SEQUENCE")
     * @ORM\SequenceGenerator(sequenceName="gender_idgender_seq", allocationSize=1, initialValue=1)
     */
    private $idgender;

    /**
     * @var string
     *
     * @ORM\Column(name="gender", type="string", length=255, nullable=false)
     */
    private $gender;


    /**
     * Get idgender.
     *
     * @return int
     */
    public function getIdgender()
    {
        return $this->idgender;
    }

    /**
     * Set gender.
     *
     * @param string $gender
     *
     * @return Gender
     */
    public function setGender($gender)
    {
        $this->gender = $gender;

        return $this;
    }

    /**
     * Get gender.
     *
     * @return string
     */
    public function getGender()
    {
        return $this->gender;
    }
}
