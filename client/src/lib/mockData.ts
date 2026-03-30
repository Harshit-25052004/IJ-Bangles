import kundanImg from "../assets/images/bangle-kundan.png";
import lacImg from "../assets/images/bangle-lac.png";
import bridalImg from "../assets/images/bangle-bridal.png";
import stoneImg from "../assets/images/bangle-stone.png";
import gallery1 from "../assets/images/gallery-1.png";
import gallery2 from "../assets/images/gallery-2.png";
import gallery3 from "../assets/images/gallery-3.png";

export const mockCollections = [
  {
    id: "royal-kundan",
    name: "Royal Kundan Bangles",
    description: "Intricate Kundan work with classic gold finish, perfect for weddings and grand occasions.",
    price: "₹2,499",
    mainImage: kundanImg,
    images: [kundanImg, gallery1, gallery3],
    createdAt: "2023-10-01"
  },
  {
    id: "traditional-lac",
    name: "Traditional Lac Bangles",
    description: "Vibrant colors with authentic Rajasthani mirror work. Handcrafted by master artisans.",
    price: "₹899",
    mainImage: lacImg,
    images: [lacImg, gallery2, gallery1],
    createdAt: "2023-10-05"
  },
  {
    id: "bridal-chooda",
    name: "Bridal Chooda Collection",
    description: "Complete bridal set symbolizing prosperity and new beginnings. Deep red and bright gold.",
    price: "₹5,999",
    mainImage: bridalImg,
    images: [bridalImg, gallery1, gallery3],
    createdAt: "2023-10-10"
  },
  {
    id: "stone-studded",
    name: "Stone Studded Bangles",
    description: "Elegant artificial diamonds for a luxurious look. Adds a touch of glamour to any outfit.",
    price: "₹1,899",
    mainImage: stoneImg,
    images: [stoneImg, gallery3, gallery2],
    createdAt: "2023-10-15"
  }
];
