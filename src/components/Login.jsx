import React from "react";
import { BrowserRouter as  Redirect, Route, Link } from "react-router-dom";
import Fire from "../config/Firebase.jsx";
import "../assets/css/material-kit.css?v=2.0.7" ;
import "../assets/demo/demo.css";
class Login extends React.Component {
  constructor(props){
    super(props);
    this.state={
        redirect:false
    }
  }
  
async comonentDidMount(){
    
    window.scrollTo(0, 0)
  }
  






  render() {
    if(this.state.redirect){

    }
    else{
        return( 
        <div style={{width:"100%"}} class="page-header header-filter">
		<div  class="login_container container">
			<div  class="login_container row">
				<div style={{padding:"0"}} class="col-sm-4">
                    <div class="login_card card card-signup">
                        <a class="login_logo">
                            <svg width="72" height="39" viewBox="0 0 72 39" fill="none">
                                <rect width="72" height="39" fill="url(#pattern0)"/>
                                <defs>
                                <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                                <use href="#image0" transform="scale(0.00970874 0.0178571)"/>
                                </pattern>
                                <image id="image0" width="103" height="56" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGcAAAA4CAYAAADgmebbAAAABGdBTUEAALGOfPtRkwAABclJREFUeAHtXF1oHFUU/mZdE6SRqLT+RKEPqaJSi5gG/IW+6YPSWpr6pr7YrbHVVn0UGwXfKm0xFtsnKyJq1BLwQUGkIFpQAyKV0tI+KBqI9UHtijaNvZ5vJneZzc7szuzO2Zm690Ays/fn3DPft+f+nLtzPbQpI1vMMDysh8GI52FIrkMmuA60qfLir+ah6hnMCi6zJrjOCC7TMwe90+08nJem0t1bzdXnLmCbkPGwNL46Td1eLit4HRO8DveXMPnVG96vSbFIRM66cTNQXcBz4hnPyzehdz0jKapx5QLP2j1QxqtH9nvVuGI2vSU5oxWzUVjfb4BrbCV37QwBAX1OvGn8mwPeR800leIyjTHe2i1m1wWDDxwxcSi1l048iSvxJc5xWiIz7tppLpv/C4ek0lhcRZeeGQJTfcvw2NE93t9LNTZ4Dpl0xCyFSfXzGPGO8qAGckYreFFMcR6jykeD8rFF3Osy6ro1Dv7sC6VEXXpdDfdBCwFT8rApPEmokbA4XT7lBn8t7FvrFTLmZJq9yk6za92av45x0+XWCCqWoGOQB9uE7zn+yt/gtFtgWlhyvMpCtd/DMCMJvuecN9juiMmRkHDTEoFhiIxJPjniThvC+e4+XwQYu6QFnh9dBk7la45rPQKBVSU/7B+R45JyRkC2Y0oy1ozkbIZrPgoB4aUk/dtQVJ5LyxcB8lIWz+kKOeVLgHW3B3+3rARWDAYPf+YP4PiPwJHvgr+Ff/MFpTCtCy/eSMWc1Z5Gk5Qdm4AbVjR/9J/PAHsleESiuiWDy4An1wN33Aj09wFfHwfe/AT45bduWRDTDjfmZLYmM2kdEdfEdpkUPnp/Ov1vfQq8dhjQsyyw58rLgXdeEC++ot6+c+cDgg4JSfML9Xnd/FQL32g02g4xtINksq62PL2xkRi22X8pUHkIeH8CuPc2bSvi9auRw64srceEzWRd6tCU0Zuba2c3vFfW6nueAq5f3rysRq4KORz8OcZ0KtRBXVpy7VXJNN+3JvCiJx4E+srJ6mRRSoUcfuNbDf5JjKcObe9JYgfLhLs6Th66IWrkZGV8Ucixz8MvzOQzwD2rbYreVYUcrmOykix1ZWVTn0wYnt0sgUl/wyUrrY16VMixC8zG5tKnZKkrfevxNVbKr/iuSzhmxWtpnqNCTvMm/z+5JWX0VNQzJJOVZKkrK5uo56c5gBENTVEhh7GyrCRLXVnZ9M888MrbWWmL16NCTpaxsSx1xcOQPIfesm0fMHMyeZ12S6osqQgoH6LTtQ51FIUcxtsYa2NQtFvxNhXPYdif0eVOhTo0txB+ryaz8Ivvgc0TwMGPu0cMLVMhh4r5jWd0uV1hXW2vOfpDc+vouTsmgZ2v57OFoNKt2Udm2J+SNgBqtwyC2nr/930IrBluDGrm0YVFPSXfwflTNnRkZ0NPGIIp6mbb8kHg8QeAO2+VbkRW/F8eA979PB9PCTMgppwlOSeEnJvCGRr3bps6HapCzsky3/yVbWp1cjiwfzYT/KUzs0dLCy8l2Qqe7dHHL/Rjkxf+qFC+z04Kh4Dwwh8VThfOMGeQ/LoF0yWeLiH7EjJHcVIUBMgHefEXodK/La5IimJeb9th+fDJ4bEfMvZUexuSgjw9X54iHyI+OXyLSg7U2V0Q83raDPJgz8epxdZ4HossfGQLyUleCBB/8mDbr5HDN3hlIBqXDLWf59pG3TUSAUP87ZvULFEjhx/4Dryw9xLvnXQXAeIePoOArUtavfCYj7UVvCepY/U57pMiAlPfHsAjnicjTkjqPIfpLMCDcuR2KlTO3eoh4B9MtJQYNtfgOdYGehDPYxEqdzUrZ8u7a2oEeJaXdGV4OYoYaoslxzblDsOzSGR3FdA7OwzPmsJBiuexiMIJt1C1qLR55dtqgiPxXDr4R2ls6TnhSjyGhad9SFe3QUIMXfgpd7j1i/eesTKGZFQOYI2CxR1dHIEKPSPDo4v/A8XBueTjLvhDAAAAAElFTkSuQmCC"/>
                                </defs>
                                </svg>
                            <span>prop vr</span>                
                        </a>
                        <h2 style={{paddingTop: "25px"}} class="Welcome-to-Prop-VR">Hello! Welcome back!</h2>
                            <p class="Have-an-account-alre">New to Prop VR?   <Link style={{paddingLeft: "10px"}} to="/signup" class="login_span">Sign up</Link></p>
						<form class="form" style={{paddingTop: "12px"}}>
							<div class="card-content">							
									<div class="form-group">
                                        <label class="input_Label">
                                            User name
                                        </label>
                                        <input type="text" class="input_box form-control" placeholder="Username or Email address"/>
                                        {/* <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> --> */}
                                    </div>
			
                                    <div class="form-group">
                                        <label class="input_Label">
                                            Password
                                        </label>
                                        <input type="password" class="input_box form-control" placeholder="Enter your password" />
                                    </div>

                                    <div class="form-group">
                                        <span class="login_span">
                                            Forgot password?
                                        </span>
                                    </div>

                                    <div class="form-group">
                                        <span class="input_error input_error_hide">
                                            <i class="fa fa-exclamation-circle" aria-hidden="true"></i>   Invalid username or password
                                        </span>
                                    </div>

                                    <div style={{textAlign: "center"}} class="form-group">
                                    <button type="submit" class="btn input_button">Login</button>
                                    </div>
							</div>
                        </form>
                        
                        <div class="join_now">
                        <span>or join with other accounts</span>
                        </div>
                        <div style={{textAlign: "center"}}>
                            <button class="btn google_button">
                                <i class="fa fa-google" aria-hidden="true"></i> Sign up with Google
                              </button>
                        </div>
					</div>
				</div>
			</div>
		</div>
	</div>)
    }
}
}
export default Login;
