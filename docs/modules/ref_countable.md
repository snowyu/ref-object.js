[ref-object](../README.md) / [Exports](../modules.md) / ref-countable

# Module: ref-countable

## Table of contents

### References

- [default](ref_countable.md#default)

### Functions

- [refCountable](ref_countable.md#refcountable)

## References

### default

Renames and re-exports [refCountable](ref_countable.md#refcountable)

## Functions

### refCountable

▸ **refCountable**(`targetClass`, `options?`): `Function`

A function that adds(injects) the ability of a specified ability class to a target class.

Note: Maybe the ability will be injected into the inheritance class.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `targetClass` | `Function` | The target class to which the ability will be added. |
| `options?` | `AbilityOptions` | An optional ability configuration object. |

#### Returns

`Function`

- An injected target class that takes a class and adds the ability to it using the specified
                      options.

#### Defined in

node_modules/custom-ability/lib/custom-ability.d.ts:103
