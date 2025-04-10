function CustomerReviews() {
  return (
    <div className="flex flex-col gap-4 mt-10">
      <h1 className="font-bold font-mono">Reviews(reviews-count)</h1>
      <div className="flex flex-col gap-6 items-start justify-start">
        <div className="flex flex-col gap-3">
          <h1>Sushovan review</h1>{" "}
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
            minus veritatis totam autem accusantium esse corrupti ea molestiae,
            nesciunt laudantium perferendis voluptas? Ea, accusantium cum libero
            nihil dignissimos accusamus reprehenderit.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <h1>Dipesh review</h1>{" "}
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
            minus veritatis totam autem accusantium esse corrupti ea molestiae,
            nesciunt laudantium perferendis voluptas? Ea, accusantium cum libero
            nihil dignissimos accusamus reprehenderit.
          </p>
        </div>
      </div>
    </div>
  );
}

export default CustomerReviews;
