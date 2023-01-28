import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { City } from '../domain/entities/city.model';
import { SearchCityService } from '../domain/services/search-city.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  errorMessage = null;
  cities: City[] = [];

  constructor(
    private readonly cityService: SearchCityService,
    private readonly router: Router,
    private alertController: AlertController
  ) { }

  async onSearch(query: string) {
    try {
      this.errorMessage = null;
      this.cities = await this.cityService.searchByName(query)
    } catch (error) {
      this.errorMessage = error.message
    }
  }

  async onGeoLocate() {
    // checa se o navegador suporta geolocalização
    if (navigator.geolocation) {

      // encontra a localização do cliente
      navigator.geolocation.getCurrentPosition(async position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        // encontra a cidade mais proxima
        const closestCity = await this.cityService.searchClosestByCoordenates({ latitude, longitude });

        // verifica se a cidade ja foi inserida no array para não causar anomalias
        let isDuplicate = this.cities.find(city => city.id === closestCity.id);

        if (isDuplicate) {
          const alert = await this.alertController.create({
            header: 'Cidade Duplicada',
            message: `A cidade ${closestCity.name} já foi encontrada.`,
            buttons: ['OK']
          });
    
          await alert.present();
        } else {
          this.cities.push(closestCity)
        }
      });
    } else {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Geolocation não é suportado pelo browser.',
        buttons: ['OK']
      });

      await alert.present();
    }
  }

  async onSelect(city: City) {
    await this.router.navigateByUrl(`/weather/${city.id}`, { replaceUrl: true })
  }

}
