const FooterComponent = () => {
  return (
    <div className="flex justify-between items-end p-6 bg-base-200 shadow-lg shadow-white h-36">
      <div>
        <p>© 2024 Anyflow Ltd. All rights reserved.</p>
      </div>

      <div className="flex flex-col justify-between h-full">
        <p>contact@anyflow.com</p>
        <p>Twitter / X @anyflow</p>
        <p>Join the Discord</p>
      </div>
    </div>
  );
};

export default FooterComponent;
