import { JSXElementConstructor, ReactElement, ReactNodeArray, ReactPortal } from "react";

export interface CarDTO {
    //length: string | number | boolean | {} | ReactElement<any, string | JSXElementConstructor<any>> | ReactNodeArray | ReactPortal | null | undefined;
      id: string,
      brand: string;
      name: string;
      about: string;
      period: string;
      price: number;
      fuel_type: string;
      thumbnail: string;
      accessories: {
          id: string;
          type: string;
          name: string;
        }[];
        
      photos: {
        id: string;
        photo: string;
      }[]
}