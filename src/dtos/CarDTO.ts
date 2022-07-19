export interface CarDTO {
    length: string | number | boolean | {} | ReactElement<any, string | JSXElementConstructor<any>> | ReactNodeArray | ReactPortal | null | undefined;
    id: string,
      brand: string;
      name: string;
      about: string;
      rent: {
        period: string;
        price: number;
      },
      fuel_type: string;
      thumbnail: string;
      accessories: {
          type: string;
          name: string;
        }[];
        
      photos: string[];
}