import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import AppBar from './AppBar.vue';


describe('Test AppBar', () => {
  it('Should render', () => {
    const wrapper = mount(AppBar, {
      props: {
        titleapp: 'tagihlunas',
      },
    });
    expect(wrapper.find('h1').exists()).toBeTruthy();
    expect(wrapper.text()).toContain('tagihlunas');
  });
});