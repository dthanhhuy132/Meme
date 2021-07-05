import './style.css';

import { useEffect } from "react";

import Button from '../common/Button';
export default function Modal({
  modalProps = {},
  children,
  header = '',
  isRenderFooter = true,
  renderFooter,
  // isEditing = false,
  isEdit = false,
  isLoading = false,
  handleOnClickOKButton,
}) {

  let {
    // postid,
    isOpenModal,
    setIsOpenModal,

    actAsyncName,
    dispatchDelete,

    dispatchActivDeactive,
    setEditOff,
  } = modalProps;

  function handleClickOK() {
    if (actAsyncName === 'active/deactie') dispatchActivDeactive();
    if (actAsyncName === 'delete') dispatchDelete();
    if (handleOnClickOKButton && typeof handleOnClickOKButton === 'function') handleOnClickOKButton();
  }

  useEffect(() => {
    const bodyEl = document.querySelector('body')
    if (isOpenModal) bodyEl.classList.add('dth-modal-open')
  }, [isOpenModal])


  function handleModal() { // --> Open Modal
    setIsOpenModal(!isOpenModal)
    const bodyEl = document.querySelector('body');
    bodyEl.classList.remove('dth-modal-open');
  }

  function handleCloseModal() {
    handleModal()
    isEdit && setEditOff()
  }

  let _renderFooter = () => {

    if (renderFooter && typeof renderFooter === 'function' && isEdit) return renderFooter()
    return (
      <>
        <Button type='modal-btn' onClick={handleCloseModal}>Cancel</Button>
        <Button type='modal-btn' active={true} onClick={handleClickOK} isLoading={isLoading}>OK</Button>
      </>
    )
  }


  return (
    <div className='modal-wrapper'>
      <div className='dth-mask'  ></div>
      <div className='dth-dialogue'>
        <div className='dth-modal-content'>

          <h3 className='dth-modal-header'>
            <i className="far fa-times-circle" onClick={handleCloseModal}></i>
            {header}
          </h3>

          <div className='dth-modal-body'>{children}</div>
          {isRenderFooter &&
            <div className='dth-modal-footer'>
              <div className='dth-modal-footer__btn'>{_renderFooter()}</div>
            </div>}
        </div>
      </div>
    </div>
  )
}