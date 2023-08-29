import { NewProductFormComponent } from './new-product-form.component';

describe('NewProductFormComponent', () => {

  // Tests that the form initializes with empty fields and default price
  it('should initialize form with empty fields and default price', () => {
    // Arrange
    const productServiceMock = jasmine.createSpyObj('ProductService', ['getProductById']);
    productServiceMock.getProductById.and.returnValue(undefined);
    const routeMock = jasmine.createSpyObj('ActivatedRoute', [], { snapshot: { params: { id: 1 } } });
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);
    const component = new NewProductFormComponent(productServiceMock, routeMock, routerMock);

    // Act
    component.ngOnInit();

    // Assert
    expect(component.editedProduct).toEqual({ id: 1, name: '', description: '', price: 1 });
  });

  // Tests that a product is not saved when the name field is empty
  it('should not save product when name field is empty', () => {
    // Arrange
    const productServiceMock = jasmine.createSpyObj('ProductService', ['addProduct']);
    const routeMock = jasmine.createSpyObj('ActivatedRoute', [], { snapshot: { params: { id: undefined } } });
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);
    const component = new NewProductFormComponent(productServiceMock, routeMock, routerMock);
    component.editedProduct = { id: 0, name: '', description: 'Test Description', price: 10 };

    // Act
    component.saveProduct();

    // Assert
    expect(productServiceMock.addProduct).not.toHaveBeenCalled();
    expect(component.editedProduct).toEqual({ id: 0, name: '', description: 'Test Description', price: 10 });
    expect(routerMock.navigate).not.toHaveBeenCalled();
  });

  // Tests that a product is not saved when the description field is empty
  it('should not save product when description field is empty', () => {
    // Arrange
    const productServiceMock = jasmine.createSpyObj('ProductService', ['addProduct']);
    const routeMock = jasmine.createSpyObj('ActivatedRoute', [], { snapshot: { params: { id: undefined } } });
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);
    const component = new NewProductFormComponent(productServiceMock, routeMock, routerMock);
    component.editedProduct = { id: 0, name: 'Test Product', description: '', price: 10 };

    // Act
    component.saveProduct();

    // Assert
    expect(productServiceMock.addProduct).not.toHaveBeenCalled();
    expect(component.editedProduct).toEqual({ id: 0, name: 'Test Product', description: '', price: 10 });
    expect(routerMock.navigate).not.toHaveBeenCalled();
  });

});

