import React from "react";

const CATEGORIES = [
  {
    title: "breakfast",
    image:
      "https://images.unsplash.com/photo-1465014925804-7b9ede58d0d7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YnJlYWtmYXN0fGVufDB8fDB8fHww",
  },
  {
    title: "lunch",
    image:
      "https://images.unsplash.com/photo-1594834749740-74b3f6764be4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGx1bmNofGVufDB8fDB8fHww",
  },
  {
    title: "dinner",
    image:
      "https://images.unsplash.com/photo-1515516969-d4008cc6241a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGRpbm5lcnxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    title: "snack",
    image:
      "https://plus.unsplash.com/premium_photo-1679435415113-2bf5c1993dc8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8c25hY2t8ZW58MHx8MHx8fDA%3D",
  },
  {
    title: "dessert",
    image:
      "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGVzc2VydHxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    title: "drinks",
    image:
      "https://images.unsplash.com/photo-1481671703460-040cb8a2d909?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGRyaW5rc3xlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    title: "others",
    image:
      "https://plus.unsplash.com/premium_photo-1673108852141-e8c3c22a4a22?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D",
  },
];

export default function Categories({ theme }) {
  return (
    <div className={`${theme === "dark" ? "bg-black" : "bg-whte"} w-full py-8`}>
      <div className="container mx-auto px-4">
        <h2
          className={`${
            theme === "dark" ? "text-white" : "text-black"
          } text-3xl mb-4`}
        >
          Explore by Categories
        </h2>
        <div className="flex overflow-x-scroll space-x-6">
          {CATEGORIES.map((category, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className="w-24 h-24 bg-cover bg-center rounded-full shadow-lg"
                style={{
                  backgroundImage: `url(${category.image})`,
                }}
              ></div>
              <p
                className={`${
                  theme === "dark" ? "text-gray-300" : "text-black"
                } mt-2 text-sm`}
              >
                {category.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
