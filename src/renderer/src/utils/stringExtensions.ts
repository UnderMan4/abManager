// Extend the String interface to include the is method with generics
// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface String {
   is<T extends string>(this: T, ...values: NoInfer<T>[]): boolean;
}

// Implement the is method on the String prototype
String.prototype.is = function <T extends string>(
   this: T,
   ...values: NoInfer<T>[]
): boolean {
   return values.includes(this);
};
