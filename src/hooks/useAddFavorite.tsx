import { useMutation } from "react-query";
import { Vehicle } from "../interfaces/vehicles";

export const useAddFavorite = () =>
  useMutation((vehicle: Vehicle) => {
    vehicle.favorite = !vehicle.favorite;
    return fetch(`/api/v1/vehicles/${vehicle.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(vehicle),
    });
  });
