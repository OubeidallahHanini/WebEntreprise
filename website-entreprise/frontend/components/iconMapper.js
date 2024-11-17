import { AiOutlineCalendar, AiFillInstagram, AiFillLinkedin, AiFillBehanceCircle } from 'react-icons/ai';
import { TfiRulerPencil } from 'react-icons/tfi';
import { VscFileSubmodule } from 'react-icons/vsc';
import { BiUser } from 'react-icons/bi';
import { BsFacebook } from 'react-icons/bs';

const iconMapper = {
  calendar: <AiOutlineCalendar size={25} />,
  ruler: <TfiRulerPencil size={25} />,
  file: <VscFileSubmodule size={25} />,
  user: <BiUser size={25} />,
  BsFacebook: <BsFacebook size={25} />,
  AiFillBehanceCircle: <AiFillBehanceCircle size={25} />,
  AiFillInstagram: <AiFillInstagram size={25} />,
  AiFillLinkedin: <AiFillLinkedin size={25} />,
};

export default iconMapper;
