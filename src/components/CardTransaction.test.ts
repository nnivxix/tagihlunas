import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import CardTransaction from './CardTransaction.vue';

describe('CardTransaction Test', () => {
  it('Card transaction should be render with props', () => {
    const wrapper = mount(CardTransaction, {
      props: {
        trxId: 'OVORP-0TCOTGAH-1117',
        amount: 7000,
        dateTrx: '2023-1-24 08:45:13.792031++00',
        userId: 'u-d167j1zf1512023',
      },
      global: {
        config: {
          compilerOptions: {
            isCustomElement: (tag: string) => {
              return tag.startsWith('router-');
            },
          },
        },
      },
    });
    expect(wrapper.text()).toContain('OVORP-0TCOTGAH-1117');
    expect(wrapper.get('#amount').html()).toContain("Rp&nbsp;7.000,00");
  });
});