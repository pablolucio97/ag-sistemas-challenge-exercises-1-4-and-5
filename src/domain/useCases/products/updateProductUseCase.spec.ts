import { PrismaService } from '../../../service/prisma';
import { ProductsService } from '../../services/product.service';

const mockProductFindUnique = jest.fn();
const mockedProductUpdate = jest.fn();

jest.mock('../../../service/prisma', () => {
  return {
    PrismaService: jest.fn().mockImplementation(() => ({
      produto: {
        findUnique: mockProductFindUnique,
        update: mockedProductUpdate,
      },
    })),
  };
});

describe('updateProduct', () => {
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
  it('should not update a product if there is a product created with same name', async () => {
    const existingProduct = {
      id: 1,
      nome: 'Mouse sem fio',
      preco: 89.9,
      descricao: 'Mouse sem fio 8000 dpi.',
    };

    const newUpdateProductData = {
      id: 2,
      nome: 'Mouse sem fio',
      preco: 79.9,
      descricao: 'Mouse sem fio 7000 dpi.',
    };

    mockProductFindUnique.mockResolvedValue(existingProduct);
    mockedProductUpdate.mockResolvedValue(null);

    const updatedProduct =
      await productService.updateProduct(newUpdateProductData);
    expect(mockedProductUpdate).not.toHaveBeenCalled();
    expect(updatedProduct).toBeNull();
  });
});
