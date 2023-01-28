import { City } from "../entities/city.model";
import { CityNotFoundError } from "../errors/city-not-found.error";
import { CityRepository } from "./protocols/city-repository";

export class SearchCityService {
    constructor(private readonly repo: CityRepository) {}

    async searchByName(name: string): Promise<City[]> {
        if (!name || name.trim().length < 3) {
            return [];
        }

        const allCities = await this.repo.getAll();

        const filteredCities = allCities.filter(
            (city: City) => city.name.toLowerCase().indexOf(name.toLowerCase()) > -1
        );

        if (filteredCities.length == 0) {
            throw new CityNotFoundError();
        }

        return filteredCities;
    }

    async searchById(id: number): Promise<City> {
        const city = this.repo.getById(id);

        if (!city) {
            throw new CityNotFoundError();
        }

        return city;
    }

    async searchClosestByCoordenates(coordenates : any) : Promise<City>{
        const cities = await this.repo.getAll();

            let closestCity;

            // declara a variavel como maximo inteiro
            let closestDistance = Number.MAX_SAFE_INTEGER;
        
            // procura a distancia pra cada cidade e compara com a distancia mais proxima, no final do loop a mais proxima será retornada
            for (let city of cities) {
                let distance = this.getDistance(coordenates.latitude, coordenates.longitude, city.coords.latitude, city.coords.longitude);
                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestCity = city;
                }
            }
        
            return closestCity;
    }

    // Haversine formula https://pt.wikipedia.org/wiki/F%C3%B3rmula_de_haversine#:~:text=O%20nome%20haversine%20foi%20criado,sen2(%CE%B82).
    getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
        let R = 6371; // Radius of the earth in km
        let dLat = this.deg2rad(lat2 - lat1);  // deg2rad below
        let dLon = this.deg2rad(lon2 - lon1); 
        let a = 
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
          Math.sin(dLon / 2) * Math.sin(dLon / 2)
          ; 
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
        let d = R * c; // Distance in km
        return d;
      }
    
      deg2rad(deg: number) {
        return deg * (Math.PI / 180);
      }
}