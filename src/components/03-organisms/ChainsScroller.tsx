const ChainsScrollerComponent = () => {
  return (
    <div className="carousel carousel-center rounded-box flex justify-around bg-base-300 h-24 p-4 bg-opacity-90">
      {/* Create a logo molecule or atom */}
      <div className="carousel-item w-7">
        <p>Logo 1</p>
      </div>
      <div className="carousel-item w-7">
        <p>Logo 2</p>
      </div>
      <div className="carousel-item w-7">
        <p>Logo 3</p>
      </div>
    </div>
  );
};

export default ChainsScrollerComponent;
