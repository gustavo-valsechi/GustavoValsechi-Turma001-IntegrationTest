import pactum from 'pactum';
import { StatusCodes } from 'http-status-codes';
import { SimpleReporter } from '../simple-reporter';
import { faker } from '@faker-js/faker';

describe('Fakershop API', () => {
  const p = pactum;
  const rep = SimpleReporter;
  const baseUrl = 'https://fakestoreapi.com';

  p.request.setDefaultTimeout(30000);

  beforeAll(() => p.reporter.add(rep));
  afterAll(() => p.reporter.end());

  describe('Products', () => {
    it('Buscar todos os produtos', async () => {
      await p
        .spec()
        .get(`${baseUrl}/products`)
        .expectStatus(StatusCodes.OK)
        .expectBodyContains('Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops')        
    });
    it('Adicionar um novo produto', async () => {
      const title = faker.commerce.product()
      const price = faker.commerce.price()
      const description = faker.commerce.productDescription()
      const category = faker.commerce.productMaterial()

      await p
        .spec()
        .post(`${baseUrl}/products`)
        .withJson({
          "title": title,
          "price": price,
          "description": description,
          "category": category,
          "image": "http://example.com"
        })
        .expectStatus(StatusCodes.OK)
        .expectBodyContains(title)      
    });
    it('Buscar um único produto', async () => {
      await p
        .spec()
        .get(`${baseUrl}/products/1`)
        .expectStatus(StatusCodes.OK)
        .expectBodyContains("Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops")
    });
    it('Atualizar um produto', async () => {
      const category = faker.commerce.productMaterial()

      await p
        .spec()
        .put(`${baseUrl}/products/1`)
        .withJson({ "category": category })
        .expectStatus(StatusCodes.OK)
        .expectBodyContains(category)
    });
    it('Deletar um produto', async () => {
      await p
        .spec()
        .delete(`${baseUrl}/products/2`)
        .expectStatus(StatusCodes.OK)
        .expectBodyContains('Mens Casual Premium Slim Fit T-Shirts ')
    });
  });

  describe('Carts', () => {
    it('Buscar todos os carrinhos', async () => {
      await p
        .spec()
        .get(`${baseUrl}/carts`)
        .expectStatus(StatusCodes.OK)
        .expectBodyContains('2020-03-02T00:00:00.000Z')        
    });
    it('Adicionar um novo carrinho', async () => {
      const title = faker.commerce.product()
      const price = faker.commerce.price()
      const description = faker.commerce.productDescription()
      const category = faker.commerce.productMaterial()

      await p
        .spec()
        .post(`${baseUrl}/carts`)
        .withJson({
          "userId": 1,
          "products": [
            {
              "title": title,
              "price": price,
              "description": description,
              "category": category,
              "image": "http://example.com"
            }
          ]
        })
        .expectStatus(StatusCodes.OK)
        .expectBodyContains(title)      
    });
    it('Buscar um único carrinho', async () => {
      await p
        .spec()
        .get(`${baseUrl}/carts/1`)
        .expectStatus(StatusCodes.OK)
        .expectBodyContains("2020-03-02T00:00:00.000Z")
    });
    it('Atualizar um carrinho', async () => {
      await p
        .spec()
        .put(`${baseUrl}/carts/1`)
        .withJson({ "userId": 2 })
        .expectStatus(StatusCodes.OK)
        .expectBodyContains(2)
    });
    it('Deletar um carrinho', async () => {
      await p
        .spec()
        .delete(`${baseUrl}/carts/2`)
        .expectStatus(StatusCodes.OK)
        .expectBodyContains('2020-01-02T00:00:00.000Z')
    });
  });
});
