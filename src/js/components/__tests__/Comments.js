import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import ObservacaoTypes from '../../types/ObservacaoTypes';
import Comments from '../Comments/Comments';
import CommentAdd from '../Comments/CommentAdd';
import CommentList from '../Comments/CommentList';
import commentSystextil from '../Comments/CommentSystextil';

configure({
  adapter: new Adapter()
});

describe('Test <Comments /> component', () => {
  let wrapperNoAddOrion;
  let wrapperAddOrion;
  let wrapperNoAddPeD;
  let wrapperNoAddSystextil;

  beforeEach(() => {
    wrapperNoAddOrion = shallow(<Comments
      observacaoType={ObservacaoTypes.ORION}
      columns={[]}
      data={[]}
    />);
    wrapperNoAddPeD = shallow(<Comments
      observacaoType={ObservacaoTypes.PeD}
      columns={[]}
      data={[]}
    />);
    wrapperNoAddSystextil = shallow(<Comments
      observacaoType={ObservacaoTypes.SYSTEXTIL}
      columns={[]}
      data={[]}
      commentText="FOOBAR"
    />);
    wrapperAddOrion = shallow(<Comments
      canAdd
      observacaoType={ObservacaoTypes.ORION}
      columns={[]}
      data={[]}
    />);
  });
  it('Should not render <CommentAdd /> component in Orion Comments', () => {
    expect(wrapperNoAddOrion.find(CommentAdd)).not.toHaveLength(1);
  });
  it('Should render only <CommentList /> compenent in Orion Comments', () => {
    expect(wrapperNoAddOrion.find(CommentAdd)).not.toHaveLength(1);
    expect(wrapperNoAddOrion.find(CommentList)).toHaveLength(1);
  });
  it('Should not render <CommentAdd /> component in PeD Comments', () => {
    expect(wrapperNoAddPeD.find(CommentAdd)).not.toHaveLength(1);
  });
  it('Should render only <CommentList /> compenent in PeD Comments', () => {
    expect(wrapperNoAddPeD.find(CommentAdd)).not.toHaveLength(1);
    expect(wrapperNoAddPeD.find(CommentList)).toHaveLength(1);
  });
  it('Should not render <CommentAdd /> and <CommentList /> components in Systextil Comments', () => {
    expect(wrapperNoAddSystextil.find(CommentAdd)).not.toHaveLength(1);
    expect(wrapperNoAddSystextil.find(CommentList)).not.toHaveLength(1);
  });
  it('Should render only <CommentSystextil /> compenent in Systextil Comments', () => {
    expect(wrapperNoAddSystextil.find(commentSystextil)).toHaveLength(1);
  });
  it('Should render <CommentAdd /> component with canAdd property', () => {
    expect(wrapperAddOrion.find(CommentAdd)).toHaveLength(1);
  });
  it('Should render <CommentAdd /> and <CommentList /> components with canAdd property', () => {
    expect(wrapperAddOrion.find(CommentAdd)).toHaveLength(1);
    expect(wrapperAddOrion.find(CommentList)).toHaveLength(1);
  });
});
