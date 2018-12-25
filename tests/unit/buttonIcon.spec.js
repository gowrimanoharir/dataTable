import { shallowMount } from '@vue/test-utils'
import buttonIcon from '@/components/buttonIcon.vue'
import svgIcons from '@/components/icons/svgIcons'

describe('buttonIcon.vue', () => {

  it('renders button with just text', () => {
    const btnFor = 'Submit'
    const button = shallowMount(buttonIcon, {
      slots: { textBefore: btnFor }
    })
    expect(button.text()).toMatch(btnFor)
  })

  it('renders button with icon and emits on click', () => {
    const iconPath = svgIcons['edit'].path;
    const btnFor = 'Edit';
    const button = shallowMount(buttonIcon, {
      propsData: { isIcon: true, path: iconPath }, 
      slots: { textAfter: btnFor }
    })
    button.find('svg').trigger('click');
    expect(button.emitted('btnClick')).toBeTruthy();
  })  

  

})
