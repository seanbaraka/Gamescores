<template>
      <Listbox v-model="selectedOption">
        <div class="relative mt-1">
          <ListboxButton
            class="relative w-full cursor-default  text-left px-4 py-2 border outline-none sm:text-sm"
            :class="[selectedOption.key === 'Premium' ? 'focus:border-[#4392F1]': 'focus:border-green-700']" 
          >
            <span class="block truncate">{{ selectedOption.key }}</span>
            <span
              class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
            >
              <ChevronUpDownIcon
                class="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </ListboxButton>
  
          <transition
            leave-active-class="transition duration-100 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <ListboxOptions
              class="absolute mt-1 max-h-60 w-full overflow-auto border bg-white py-1 text-base shadow-lg  focus:outline-none sm:text-sm"
            >
              <ListboxOption
                v-slot="{ active, selected }"
                v-for="option in options"
                :key="option.key"
                :value="option"
                as="template"
                @click="events('onOptionSelected', selectedOption)"
              >
                <li
                  :class="[
                    active ? 'bg-[#F8F8F8] text-green-700' : 'text-gray-900',
                    'relative cursor-default select-none py-2 pl-10 pr-4',
                  ]"
                >
                  <span
                    :class="[
                      selected ? 'font-medium' : 'font-normal',
                      'block truncate',
                    ]"
                    >{{ option.key }}</span
                  >
                  <span
                    v-if="selected"
                    class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
                  >
                    <CheckIcon class="h-5 w-5" aria-hidden="true" />
                  </span>
                </li>
              </ListboxOption>
            </ListboxOptions>
          </transition>
        </div>
      </Listbox>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import {
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
  } from '@headlessui/vue'
  import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
  
  const props = defineProps({
    options: Array,
  })

  const events = defineEmits(['onOptionSelected'])
  const selectedOption = ref(props.defaultOptionKey ? { key: props.defaultOptionKey } : props.options[0])
  </script>
  