class Mapper 
{
  mapToFormData<T extends object>(data: T): FormData {
    function isPlainObject(value: unknown): value is Record<string, unknown> {
      return (
          typeof value === "object" &&
          value !== null &&
          Object.getPrototypeOf(value) === Object.prototype
      );
    }
    const formData = new FormData()
    
    Object.entries(data).forEach(([key, value]) => 
    {
      if (value instanceof File || value instanceof Blob) 
        formData.append(key, value);
      // else if (isPlainObject(value) || Array.isArray(value)) 
      //   formData.append(key, JSON.stringify(value));
      else if (isPlainObject(value)) 
        formData.append(key, JSON.stringify(value));
      else if (Array.isArray(value)) 
        formData.append(key, JSON.stringify(value));
      else if (value !== undefined && value !== null)
        formData.append(key, String(value));
    })

    return formData
  }
}

export const mapper = new Mapper()