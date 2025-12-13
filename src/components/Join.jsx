import React from "react";

// Simple BookCourier community section (no Typewriter)

const Join= () => {
  return (
    <section className="bg-gradient-to-r my-20 mb-10 from-orange-700 to-orange-400 text-white py-16 px-6 md:px-20">
      <div className="max-w-6xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Join the Community of Book Lovers
        </h2>

        {/* Subtitle */}
        <p className="text-lg md:text-xl mb-8">
          Connect with readers, explore new titles, and make borrowing books easier than ever.
        </p>

        {/* Stats */}
        <div className="grid my-4 mt-10 grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div>
            <p className="text-3xl font-bold">10,000+</p>
            <p>Active Readers</p>
          </div>
          <div>
            <p className="text-3xl font-bold">50,000+</p>
            <p>Books Delivered</p>
          </div>
          <div>
            <p className="text-3xl font-bold">1200+</p>
            <p>Partner Libraries</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Join;