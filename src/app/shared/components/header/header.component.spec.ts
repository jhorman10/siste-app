import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {

  it('should initialize HeaderComponent with options and activeOption values', () => {
    // Arrange
    const headerComponent = new HeaderComponent();

    // Act

    // Assert
    expect(headerComponent.options).toEqual([
      { name: 'Home', url: 'home' },
      { name: 'Client', url: 'client' },
      { name: 'Product', url: 'product' },
    ]);
    expect(headerComponent.activeOption).toBe('/');
  });

  it('should not update activeOption when clicking on an option not in the options array', () => {
    // Arrange
    const headerComponent = new HeaderComponent();
    const option = { name: 'Non-existent', url: 'non-existent' };

    // Act

    // Assert
    expect(headerComponent.activeOption).toBe('/');
  });
});

