const chai = require('chai');
const spies = require('chai-spies');
chai.use(spies);
import { expect, util } from 'chai';
import domUpdate from '../src/domUpdate';

describe('domUpdate', () => {
  let element, card1, card2;
  beforeEach(() => {
    element = {classList: {toggle: () => {}}};
    card1 = {classList: {add: () => {}}};
    card2 = {classList: {remove: () => {}}};
    chai.spy.on(element.classList, ['toggle'], () => {});
    chai.spy.on(card1.classList, ['add'], ()=> {});
    chai.spy.on(card2.classList, ['remove'], ()=> {});
  }) 

  afterEach(() => {
    chai.spy.restore(element.classList);
  }) 

  it('should call toggle when invoking toggleElement', () => {
    domUpdate.toggleElement(element);
    
    expect(element.classList.toggle).to.have.been.called(1);
    expect(element.classList.toggle).to.have.been.called.with('show-modal');
  })

  it('should call toggle when invoking showDropDown', () => {
    domUpdate.displayProfileDropDown(element, 'Isabel', {}, 230);

    expect(element.classList.toggle).to.have.been.called(1);
    expect(element.classList.toggle).to.have.been.called.with('hide');
  })


  it('should call add when invoking flipCard', () => {
    domUpdate.flipCard(card1, card2);

    expect(card1.classList.add).to.have.been.called(1);
    expect(card1.classList.add).to.have.been.called.with('hide')
  })

  it('should call remove when invoking flipCard', () => {
    domUpdate.flipCard(card1, card2);

    expect(card2.classList.remove).to.have.been.called(1);
    expect(card2.classList.remove).to.have.been.called.with('hide')
  })
  
})

