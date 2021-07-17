import { createGlobalStyle } from "styled-components"



export const lightTheme = {
}


// Mau header: #242526
export const darkTheme = {
  defaultColor: "#3482e2",

  body: '#18191a',
  fontColor: '#fff',
  bodyPost: '#242526',
  borderColor: '#525252',
  commentColor: '#393939',
  areaTextColor: '#242526',
  areaTextFocus: '#707070',
  textColorRed: '#f2ff00',
  commentTextColor: '#c1bebe',


  modalOpacity: 'rgba(0, 0, 0, 0.88)',
  modalSettingBackground: '#4a4a4a',
  transparentBackground: '#ffffff00',

  boxShadowNone: 'none',

  navCategoryBackground: "url('https://i.ytimg.com/vi/zKbbUhuhhik/maxresdefault.jpg')",
  backgroundSize: 'cover',
  backgroundPosition: 'center',

  borderWidthSolid: '1px solid',

  borderChecked: '2px solid #fff'

}


export const GlobalStyle = createGlobalStyle`
  body > * {
    transition: all 0.2s ease-in-out;
  }

  body {
    background: ${props => props.theme.body};
    transition: all 0.2s ease-in-out;

  }
  // ____________________________________________ HEADER && FOOTER
  .ass1-header, .dth-footer {
    background: ${props => props.theme.bodyPost};
    border-bottom: ${props => props.theme.borderWidthSolid};
    
  }

  .dth-footer {
    border-top: ${props => props.theme.borderWidthSolid};
  }

  .ass1-header__nav {
    background-image: ${props => props.theme.navCategoryBackground};
    background-size: ${props => props.theme.cover};
    background-position: ${props => props.theme.backgroundPosition};
    border-top: ${props => props.theme.borderWidthSolid} ${props => props.theme.borderColor};
    border-bottom: ${props => props.theme.borderWidthSolid} ${props => props.theme.borderColor}
  }

  input {
    background-color: ${props => props.theme.bodyPost} !important;
    border: ${props => props.theme.borderWidthSolid} ${props => props.theme.borderColor} !important;
  }

  .dth-mask {
    background-color: ${props => props.theme.modalOpacity} !important;
  }

  .ass1-btn:hover {
    background-color: ${props => props.theme.transparentBackground};
  }
  
  .ass1-btn:hover i {
    color: ${props => props.theme.defaultColor} !important;
  }

  .dth-footer a i,
  .ass1-header__nav ul li a,
  .ass1-head-user__name span {
    color: ${props => props.theme.fontColor}
  }

  
  
  //_____________________________________________________________________________ POST/Modal
  .dth-modal-content, .ass1-section,
  select {
    background: ${props => props.theme.bodyPost} !important
  }

  .dth-far,
  .dth-fa-plus,
  {
    color: ${props => props.theme.fontColor} !important;
  }

  .ass1-section__name,
  .ass1-content-head__t, 
  .dth-header-btn-category,
  p, 
  .ass1-comments__name,
  .ass1-comments,
  .homepage-aside-login,
  .comment-login,
  .ass1-btn-icon:hover i,
  .ass1-btn-icon span,
  .count-posts,
  input,
  textarea,
  h3,
  select,
  .dth-no-comment
   {
    color: ${props => props.theme.fontColor} !important;
  }

  ::placeholder {
    color: ${props => props.theme.commentTextColor} !important;
  }

  .ass1-comments__content p {
    color: ${props => props.theme.commentTextColor} !important;
  }
  
  .dth-user-login__text-in-profile {
    color: rgb(12, 237, 245)
  }

  .dotLoading-cmt svg g circle {
    fill: ${props => props.theme.fontColor}
  }
  
  .ass1-section__head, .ass1-section__content,
  select {
    border-bottom: ${props => props.theme.borderWidthSolid} ${props => props.theme.borderColor};
  }

  .col-lg-4 .ass1-section__content {
    border-bottom: none !important;
  }

  // _______________________________________________________________________ Comment
  .ass1-add-comment,
  .ass1-comments__section {
    background: ${props => props.theme.commentColor}
  }

  textarea {
    background: ${props => props.theme.areaTextColor} !important;
    border: ${props => props.theme.borderWidthSolid};
    color: ${props => props.theme.fontColor};
  }
  .ass1-add-comment .form-control:focus {
    background-color: ${props => props.theme.areaTextFocus};
  }


  //________________________________________________________________________ Login form  && Footer
  .ass1-login__form,
  .ass1-login__form .form-checkbox {
    background: ${props => props.theme.bodyPost}
  }

  
  .user-option-responsive div i,
  .dth-user-login,
  .ass1-login__form .form-checkbox .check-label {
    color: ${props => props.theme.fontColor};
  }

  .user-option-responsive .dth-footer-disable div i {
   color: 'red' !important;
  }

  .user-option-responsive,
  .user-setting__items {
    background: ${props => props.theme.modalSettingBackground};
    box-shadow: ${props => props.theme.boxShadowNone}
  }

  //__________________________________________________________________ UPLOAD 
  .ass1-checkbox input:checked + span:before {
    border-right: ${props => props.theme.borderChecked};
    border-bottom: ${props => props.theme.borderChecked}
  }

  .ass1-section__image__subClass,
  select {
    border: ${props => props.theme.borderWidthSolid} ${props => props.theme.borderColor} !important;
  }
  
  .dth-form-group_upload textarea,
  .dth-profile-desc {
    border: ${props => props.theme.borderWidthSolid} ${props => props.theme.borderColor};
  }

  .ass1-aside__edit-post {
    color: ${props => props.theme.fontColor}
  }  

  .warning-description p, 
  .warning-img, 
  .warnign-category {
    color: ${props => props.theme.textColorRed} !important;
  }
`