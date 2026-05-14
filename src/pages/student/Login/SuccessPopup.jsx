import React from "react";

const SuccessPopup = () => {
  return (
    <>  
      <div class="modal fade" id="profileCreated" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-body">
        <div class="pass-pop">
            <div class="sucess-icon">
            <img src="images/login/sucess-icon.svg" alt=""/>
        </div>
        <p class="pass-text">Your profile has been created <br/> Successfully!</p>
        <button type="button" class="primary-cta" data-bs-dismiss="modal">Okay</button>
        </div>
      </div>
    </div>
  </div>
</div>
    </>
  )
}

export default SuccessPopup;