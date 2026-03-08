/**
 * Customer entity representing a registered user.
 * Contains basic customer identification information.
 */
export class Customer {
  constructor(
    public readonly id: string,
    public readonly firstName: string,
    public readonly lastName: string,
  ) {}
}
