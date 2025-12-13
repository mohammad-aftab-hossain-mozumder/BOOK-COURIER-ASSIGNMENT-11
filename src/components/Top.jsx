import React from "react";

const readers = [
    {
        name: "Abdur Rahman",
        info: "42 Books Ordered",
        img: "https://pbs.twimg.com/profile_images/1111801647985029120/JVZIZ0WF_400x400.jpg",
    },
    {
        name: "Tanvir Hasan",
        info: "37 Books Ordered",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSacrO36guVhvb9lmkCOOqAT9in-_4phDMqVw&s",
    },
    {
        name: "John Menk",
        info: "33 Books Ordered",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSM237tF21rpXqHZobg8H4k5mHIxYvh8RX_oQ&s",
    },
    {
        name: "Rafiul Islam",
        info: "29 Books Ordered",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR08SZ38baOJKEtQ0bHCYBagFVTuI2DO89qSQ&s",
    },
];

const Top = () => {
    return (
        <section className="max-w-6xl mx-auto mb-30 px-4 py-12">
            <h2 className="text-4xl font-black text-center text-orange-500 mb-7">
                Top Readers of the Week
            </h2>

            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                {readers.map((reader, i) => (
                    <div
                        key={i}
                        className="bg-white p-4 rounded-2xl shadow hover:shadow-lg transition border border-gray-100"
                    >
                        <img
                            src={reader.img}
                            alt={reader.name}
                            className="w-24 h-24 rounded-full mx-auto object-cover"
                        />
                        <h3 className="text-lg text-orange-500 font-semibold text-center mt-4">
                            {reader.name}
                        </h3>
                        <p className="text-sm text-gray-700 text-center">{reader.info}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Top