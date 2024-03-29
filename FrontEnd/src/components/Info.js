const Info = (props) => {
  const { responseData } = props;
  const info = responseData.split("<br>");

  return (
    <p className="flex flex-col text-xl text-center text-[#FF0000] pb-2">
      {info.map((element) => (
        <p key={element}>
          {element}
          <br />
        </p>
      ))}
    </p>
  );
};

export default Info;
