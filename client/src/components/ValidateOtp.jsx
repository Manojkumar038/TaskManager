import React, {useState, useEffect} from "react";
import OtpInput from "react-otp-input"; 

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  },
  input_style: {
    width: "3rem",
    height: "3rem",
    margin: "0 1rem",
    fontSize: "2rem",
    borderRadius: "4px",
    border: "1px solid #ced4da",
  },
};

const ValidateOtp = ({type, inputSize, onVerify}) => {
    const [otp, setOtp] = useState("");
    
    useEffect(() => {
        if(otp.length === inputSize) {
            onVerify(otp);
        }
    }, [otp, inputSize]);

    return (
      <div style={styles.container}>
        <h3>Enter the OTP sent to your email</h3>
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={inputSize}
          separator={<span>-</span>}
          shouldAutoFocus={true}
          inputStyle={styles.input_style}
          renderInput={(props) => <input {...props} />}
        />
      </div>
    );
}

export default ValidateOtp; 