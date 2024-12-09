import { PrismaService } from '../../../service/prisma';
import { ProductsService } from '../../services/product.service';

const mockProductFindUnique = jest.fn();
const mockProductCreate = jest.fn();

jest.mock('../../../service/prisma', () => {
  return {
    PrismaService: jest.fn().mockImplementation(() => ({
      produto: {
        findUnique: mockProductFindUnique,
        create: mockProductCreate,
      },
    })),
  };
});

describe('createProduct', () => {
  let productService: ProductsService;
  let prismaService: PrismaService;

  beforeEach(() => {
    prismaService = new PrismaService();
    productService = new ProductsService(prismaService);
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should register a product if no product with the same name already exists', async () => {
    const newProductData = {
      id: 1,
      nome: 'Mouse sem fio',
      preco: 89.9,
      descricao: 'Mouse sem fio 8000 dpi.',
    };

    mockProductFindUnique.mockResolvedValue(null);
    mockProductCreate.mockResolvedValue(newProductData);

    const createdProduct = await productService.createProduct(newProductData);

    expect(mockProductFindUnique).toHaveBeenCalledWith({
      where: { nome: newProductData.nome },
    });
    expect(mockProductCreate).toHaveBeenCalledWith({ data: newProductData });
    expect(createdProduct).toEqual(newProductData);
  });
  it('should not register a product if some product with the same name already exists', async () => {
    const newProductData = {
      id: 1,
      nome: 'Mouse sem fio',
      preco: 89.9,
      descricao: 'Mouse sem fio 8000 dpi.',
    };

    mockProductFindUnique.mockResolvedValue(newProductData);
    mockProductCreate.mockResolvedValue(newProductData);

    const createdProduct = await productService.createProduct(newProductData);

    expect(mockProductFindUnique).toHaveBeenCalledWith({
      where: { nome: newProductData.nome },
    });
    expect(createdProduct).toBeNull();
  });
});
