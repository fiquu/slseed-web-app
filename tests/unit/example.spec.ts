import { shallowMount } from '@vue/test-utils';
import { expect } from 'chai';

import ExampleComponent from '@/components/example.vue';

describe('loader-message.vue', function() {
  it('renders with provided message', function() {
    const message = 'new message';
    const wrapper = shallowMount(ExampleComponent, {
      slots: {
        default: [message]
      }
    });

    expect(wrapper.text()).to.include(message);
  });
});
