import "./Avatar.css";

const Avatar = (props) => {
  const colors = ['#00AA55', '#009FD4', '#B381B3', '#939393', '#E3BC00', '#D47500', '#DC2A2A'];
  function numberFromText(text) {
    // numberFromText("AA");
    const charCodes = text
      .split('') // => ["A", "A"]
      .map(char => char.charCodeAt(0)) // => [65, 65]
      .join(''); // => "6565"
    return parseInt(charCodes, 10);
  }
  const size = props.size || 32 + "px";
  const fontSize = props.fontSize || 15 + "px";
  if(props.pictureUrl && props.pictureUrl !== "")
  {
      return <img alt="Profile" src={props.pictureUrl} width={size} height={size} className="rounded-circle mr-3" />
  }
  else
  {
    const fullName= props.fullName || 'Unknown User';
    const text = fullName.split(' ').map(name => name[0]).join('').toUpperCase();
    const bgColor= props.bgColor || colors[numberFromText(text) % colors.length];
    const textColor= props.textColor || "fff";
    return <div 
            className="mp-avatar"
            style={{
              backgroundColor: bgColor,
              color: textColor,
              width:size, 
              height:size,
              lineHeight: size,
              fontSize: fontSize,
            }} 
            
            >{text}</div>
  }
}
export default Avatar;