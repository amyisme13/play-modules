import { serialize } from 'object-to-formdata';

function prepareJson(data: Record<string, any>, opts = { transformBoolean: false }) {
  const output: typeof data = {};

  for (const key in data) {
    const value = data[key];
    const isNullish = value === null || value === undefined || value === '';

    if (typeof value === 'object' && value !== null) {
      output[key] = prepareJson(value, opts);
    } else if (typeof value === 'boolean' && opts.transformBoolean) {
      output[key] = value ? 1 : 0;
    } else if (!isNullish) {
      output[key] = value;
    }
  }

  return output;
}

export function transformParams(params: Record<string, any>) {
  return prepareJson(params, { transformBoolean: true });
}

// Taken from https://github.com/inertiajs/inertia
// Thanks to inertia team :D

function hasFiles(data: any): boolean {
  return (
    data instanceof File ||
    data instanceof Blob ||
    (data instanceof FileList && data.length > 0) ||
    (data instanceof FormData && Array.from(data.values()).some((value) => hasFiles(value))) ||
    (typeof data === 'object' &&
      data !== null &&
      Object.values(data).some((value) => hasFiles(value)))
  );
}

export function transformData(data: Record<string, any>) {
  if (hasFiles(data)) {
    return serialize(data, {
      allowEmptyArrays: true,
      booleansAsIntegers: true,
      indices: true,
      nullsAsUndefineds: true,
    });
  }

  return prepareJson(data);
}
