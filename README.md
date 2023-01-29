# ClimaBR

Aplicação web para consulta da previsão do tempo de cidades brasileiras com a funcionalidade extra de encontrar a cidade mais próxima. 

# Como utilizar?

Clone este repositório.

Entre na pasta do projeto e execute o comando abaixo para instalar as dependências:

`npm install`

Acesse o site https://openweathermap.org/api, faça seu cadastro e crie uma chave de API.

No arquivo `api-config.ts` no diretório `src/environment` do projeto, coloque sua chave.

```ts
export const openWeatherConfig = {
    key: '<sua-chave-de-api>',
    URL: 'https://api.openweathermap.org/data/2.5/onecall',
    iconURL: 'http://openweathermap.org/img/wn',
}
```

Para abrir a aplicação, execute o comando:

`ionic serve`

# Funcionalidade Geolocalização

Para usar a funcionalidade de geolocalização, ative-a no seu browser. Ao usar essa funcionalidade um prompt será aberto, então clique em "Permitir".
