import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import TheAvatar from './TheAvatar.vue';

describe('The Avatar Test', () => {
  it('Avatar should be contain initial name', () => {
    const wrapper = mount(TheAvatar, {
      props: {
        name: 'Hanasa',
        background: '#ff67aa',
      },
    });
    expect(wrapper.get('#initial').text()).toContain("H");
  });
});