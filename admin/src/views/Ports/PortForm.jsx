import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { 
  TextField, 
  Button,
  Grid,
  Box, 
  Paper,
  Typography,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from '@mui/material'
import { Send, Clear } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { API } from '../../configs';
import axios from 'axios'

function PortForm() {

  const [action, setAction] = useState('')
  const [title, setTitle] = useState('')

  const [nom, setNom] = useState('')
  const [ville, setVille] = useState('')
  const [country, setCountry] = useState('')

  const {id} = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    if(!id){
      setAction("add")
      setTitle("Ajouter Nouveau Port")
      console.log("add")
    }else {
      setAction("edit")
      setTitle("Modifier Port")
      console.log("edit")
    }
  }, [id])
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!nom || !ville || !country) {
      toast.error("All field required", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }else {
      if(action === "add") {
        await axios.post(`${API}/ports/create`,{
          nom:nom,
          ville:ville,
          country:country,
        })
        .then((res) => {
          if(res.data.success) {
            toast.success(res.data.message, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
    
            navigate('/admin/ports')
          }else {
            toast.error(res.data.message, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          }
        })
      }else {
        await axios.put(`${API}/ports/update/${id}`,{
          nom:nom,
          ville:ville,
          country:country,
        })
        .then((res) => {
          if(res.data.success) {
            toast.success(res.data.message, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
    
            navigate('/admin/ports')
          }else {
            toast.error(res.data.message, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          }
        })
      }
    }
  }

  return (
    <Box sx={{ width: '100%'}}>
    <Paper sx={{ width: '100%', mb: 2, minHeight:'400px', padding:2 }}>
      <Typography variant="h4">{title}</Typography>
      <div className='formContainer'>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                required
                id="filled-basic"
                label="Nom"
                defaultValue=""
                variant="filled"
                onChange={(e) =>setNom(e.target.value) }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                required
                id="filled-basic"
                label="Ville"
                defaultValue=""
                variant="filled"
                onChange={(e) =>setVille(e.target.value) }
              />
            </Grid>

            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Country</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={country}
                  label="Country"
                  onChange={(e) => setCountry(e.target.value)}
                >
                  <MenuItem>country</MenuItem>
                  <MenuItem value="Afghanistan">Afghanistan</MenuItem>
                  <MenuItem value="Aland Islands">Åland Islands</MenuItem>
                  <MenuItem value="Albania">Albania</MenuItem>
                  <MenuItem value="Algeria">Algeria</MenuItem>
                  <MenuItem value="American Samoa">American Samoa</MenuItem>
                  <MenuItem value="Andorra">Andorra</MenuItem>
                  <MenuItem value="Angola">Angola</MenuItem>
                  <MenuItem value="Anguilla">Anguilla</MenuItem>
                  <MenuItem value="Antarctica">Antarctica</MenuItem>
                  <MenuItem value="Antigua and Barbuda">Antigua & Barbuda</MenuItem>
                  <MenuItem value="Argentina">Argentina</MenuItem>
                  <MenuItem value="Armenia">Armenia</MenuItem>
                  <MenuItem value="Aruba">Aruba</MenuItem>
                  <MenuItem value="Australia">Australia</MenuItem>
                  <MenuItem value="Austria">Austria</MenuItem>
                  <MenuItem value="Azerbaijan">Azerbaijan</MenuItem>
                  <MenuItem value="Bahamas">Bahamas</MenuItem>
                  <MenuItem value="Bahrain">Bahrain</MenuItem>
                  <MenuItem value="Bangladesh">Bangladesh</MenuItem>
                  <MenuItem value="Barbados">Barbados</MenuItem>
                  <MenuItem value="Belarus">Belarus</MenuItem>
                  <MenuItem value="Belgium">Belgium</MenuItem>
                  <MenuItem value="Belize">Belize</MenuItem>
                  <MenuItem value="Benin">Benin</MenuItem>
                  <MenuItem value="Bermuda">Bermuda</MenuItem>
                  <MenuItem value="Bhutan">Bhutan</MenuItem>
                  <MenuItem value="Bolivia">Bolivia</MenuItem>
                  <MenuItem value="Bonaire, Sint Eustatius and Saba">Caribbean Netherlands</MenuItem>
                  <MenuItem value="Bosnia and Herzegovina">Bosnia & Herzegovina</MenuItem>
                  <MenuItem value="Botswana">Botswana</MenuItem>
                  <MenuItem value="Bouvet Island">Bouvet Island</MenuItem>
                  <MenuItem value="Brazil">Brazil</MenuItem>
                  <MenuItem value="British Indian Ocean Territory">British Indian Ocean Territory</MenuItem>
                  <MenuItem value="Brunei Darussalam">Brunei</MenuItem>
                  <MenuItem value="Bulgaria">Bulgaria</MenuItem>
                  <MenuItem value="Burkina Faso">Burkina Faso</MenuItem>
                  <MenuItem value="Burundi">Burundi</MenuItem>
                  <MenuItem value="Cambodia">Cambodia</MenuItem>
                  <MenuItem value="Cameroon">Cameroon</MenuItem>
                  <MenuItem value="Canada">Canada</MenuItem>
                  <MenuItem value="Cape Verde">Cape Verde</MenuItem>
                  <MenuItem value="Cayman Islands">Cayman Islands</MenuItem>
                  <MenuItem value="Central African Republic">Central African Republic</MenuItem>
                  <MenuItem value="Chad">Chad</MenuItem>
                  <MenuItem value="Chile">Chile</MenuItem>
                  <MenuItem value="China">China</MenuItem>
                  <MenuItem value="Christmas Island">Christmas Island</MenuItem>
                  <MenuItem value="Cocos (Keeling) Islands">Cocos (Keeling) Islands</MenuItem>
                  <MenuItem value="Colombia">Colombia</MenuItem>
                  <MenuItem value="Comoros">Comoros</MenuItem>
                  <MenuItem value="Congo">Congo - Brazzaville</MenuItem>
                  <MenuItem value="Congo, Democratic Republic of the Congo">Congo - Kinshasa</MenuItem>
                  <MenuItem value="Cook Islands">Cook Islands</MenuItem>
                  <MenuItem value="Costa Rica">Costa Rica</MenuItem>
                  <MenuItem value="Cote D'Ivoire">Côte d’Ivoire</MenuItem>
                  <MenuItem value="Croatia">Croatia</MenuItem>
                  <MenuItem value="Cuba">Cuba</MenuItem>
                  <MenuItem value="Curacao">Curaçao</MenuItem>
                  <MenuItem value="Cyprus">Cyprus</MenuItem>
                  <MenuItem value="Czech Republic">Czechia</MenuItem>
                  <MenuItem value="Denmark">Denmark</MenuItem>
                  <MenuItem value="Djibouti">Djibouti</MenuItem>
                  <MenuItem value="Dominica">Dominica</MenuItem>
                  <MenuItem value="Dominican Republic">Dominican Republic</MenuItem>
                  <MenuItem value="Ecuador">Ecuador</MenuItem>
                  <MenuItem value="Egypt">Egypt</MenuItem>
                  <MenuItem value="El Salvador">El Salvador</MenuItem>
                  <MenuItem value="Equatorial Guinea">Equatorial Guinea</MenuItem>
                  <MenuItem value="Eritrea">Eritrea</MenuItem>
                  <MenuItem value="Estonia">Estonia</MenuItem>
                  <MenuItem value="Ethiopia">Ethiopia</MenuItem>
                  <MenuItem value="Falkland Islands (Malvinas)">Falkland Islands (Islas Malvinas)</MenuItem>
                  <MenuItem value="Faroe Islands">Faroe Islands</MenuItem>
                  <MenuItem value="Fiji">Fiji</MenuItem>
                  <MenuItem value="Finland">Finland</MenuItem>
                  <MenuItem value="France">France</MenuItem>
                  <MenuItem value="French Guiana">French Guiana</MenuItem>
                  <MenuItem value="French Polynesia">French Polynesia</MenuItem>
                  <MenuItem value="French Southern Territories">French Southern Territories</MenuItem>
                  <MenuItem value="Gabon">Gabon</MenuItem>
                  <MenuItem value="Gambia">Gambia</MenuItem>
                  <MenuItem value="Georgia">Georgia</MenuItem>
                  <MenuItem value="Germany">Germany</MenuItem>
                  <MenuItem value="Ghana">Ghana</MenuItem>
                  <MenuItem value="Gibraltar">Gibraltar</MenuItem>
                  <MenuItem value="Greece">Greece</MenuItem>
                  <MenuItem value="Greenland">Greenland</MenuItem>
                  <MenuItem value="Grenada">Grenada</MenuItem>
                  <MenuItem value="Guadeloupe">Guadeloupe</MenuItem>
                  <MenuItem value="Guam">Guam</MenuItem>
                  <MenuItem value="Guatemala">Guatemala</MenuItem>
                  <MenuItem value="Guernsey">Guernsey</MenuItem>
                  <MenuItem value="Guinea">Guinea</MenuItem>
                  <MenuItem value="Guinea-Bissau">Guinea-Bissau</MenuItem>
                  <MenuItem value="Guyana">Guyana</MenuItem>
                  <MenuItem value="Haiti">Haiti</MenuItem>
                  <MenuItem value="Heard Island and Mcdonald Islands">Heard & McDonald Islands</MenuItem>
                  <MenuItem value="Holy See (Vatican City State)">Vatican City</MenuItem>
                  <MenuItem value="Honduras">Honduras</MenuItem>
                  <MenuItem value="Hong Kong">Hong Kong</MenuItem>
                  <MenuItem value="Hungary">Hungary</MenuItem>
                  <MenuItem value="Iceland">Iceland</MenuItem>
                  <MenuItem value="India">India</MenuItem>
                  <MenuItem value="Indonesia">Indonesia</MenuItem>
                  <MenuItem value="Iran, Islamic Republic of">Iran</MenuItem>
                  <MenuItem value="Iraq">Iraq</MenuItem>
                  <MenuItem value="Ireland">Ireland</MenuItem>
                  <MenuItem value="Isle of Man">Isle of Man</MenuItem>
                  <MenuItem value="Israel">Israel</MenuItem>
                  <MenuItem value="Italy">Italy</MenuItem>
                  <MenuItem value="Jamaica">Jamaica</MenuItem>
                  <MenuItem value="Japan">Japan</MenuItem>
                  <MenuItem value="Jersey">Jersey</MenuItem>
                  <MenuItem value="Jordan">Jordan</MenuItem>
                  <MenuItem value="Kazakhstan">Kazakhstan</MenuItem>
                  <MenuItem value="Kenya">Kenya</MenuItem>
                  <MenuItem value="Kiribati">Kiribati</MenuItem>
                  <MenuItem value="Korea, Democratic People's Republic of">North Korea</MenuItem>
                  <MenuItem value="Korea, Republic of">South Korea</MenuItem>
                  <MenuItem value="Kosovo">Kosovo</MenuItem>
                  <MenuItem value="Kuwait">Kuwait</MenuItem>
                  <MenuItem value="Kyrgyzstan">Kyrgyzstan</MenuItem>
                  <MenuItem value="Lao People's Democratic Republic">Laos</MenuItem>
                  <MenuItem value="Latvia">Latvia</MenuItem>
                  <MenuItem value="Lebanon">Lebanon</MenuItem>
                  <MenuItem value="Lesotho">Lesotho</MenuItem>
                  <MenuItem value="Liberia">Liberia</MenuItem>
                  <MenuItem value="Libyan Arab Jamahiriya">Libya</MenuItem>
                  <MenuItem value="Liechtenstein">Liechtenstein</MenuItem>
                  <MenuItem value="Lithuania">Lithuania</MenuItem>
                  <MenuItem value="Luxembourg">Luxembourg</MenuItem>
                  <MenuItem value="Macao">Macao</MenuItem>
                  <MenuItem value="Macedonia, the Former Yugoslav Republic of">North Macedonia</MenuItem>
                  <MenuItem value="Madagascar">Madagascar</MenuItem>
                  <MenuItem value="Malawi">Malawi</MenuItem>
                  <MenuItem value="Malaysia">Malaysia</MenuItem>
                  <MenuItem value="Maldives">Maldives</MenuItem>
                  <MenuItem value="Mali">Mali</MenuItem>
                  <MenuItem value="Malta">Malta</MenuItem>
                  <MenuItem value="Marshall Islands">Marshall Islands</MenuItem>
                  <MenuItem value="Martinique">Martinique</MenuItem>
                  <MenuItem value="Mauritania">Mauritania</MenuItem>
                  <MenuItem value="Mauritius">Mauritius</MenuItem>
                  <MenuItem value="Mayotte">Mayotte</MenuItem>
                  <MenuItem value="Mexico">Mexico</MenuItem>
                  <MenuItem value="Micronesia, Federated States of">Micronesia</MenuItem>
                  <MenuItem value="Moldova, Republic of">Moldova</MenuItem>
                  <MenuItem value="Monaco">Monaco</MenuItem>
                  <MenuItem value="Mongolia">Mongolia</MenuItem>
                  <MenuItem value="Montenegro">Montenegro</MenuItem>
                  <MenuItem value="Montserrat">Montserrat</MenuItem>
                  <MenuItem value="Morocco">Morocco</MenuItem>
                  <MenuItem value="Mozambique">Mozambique</MenuItem>
                  <MenuItem value="Myanmar">Myanmar (Burma)</MenuItem>
                  <MenuItem value="Namibia">Namibia</MenuItem>
                  <MenuItem value="Nauru">Nauru</MenuItem>
                  <MenuItem value="Nepal">Nepal</MenuItem>
                  <MenuItem value="Netherlands">Netherlands</MenuItem>
                  <MenuItem value="Netherlands Antilles">Curaçao</MenuItem>
                  <MenuItem value="New Caledonia">New Caledonia</MenuItem>
                  <MenuItem value="New Zealand">New Zealand</MenuItem>
                  <MenuItem value="Nicaragua">Nicaragua</MenuItem>
                  <MenuItem value="Niger">Niger</MenuItem>
                  <MenuItem value="Nigeria">Nigeria</MenuItem>
                  <MenuItem value="Niue">Niue</MenuItem>
                  <MenuItem value="Norfolk Island">Norfolk Island</MenuItem>
                  <MenuItem value="Northern Mariana Islands">Northern Mariana Islands</MenuItem>
                  <MenuItem value="Norway">Norway</MenuItem>
                  <MenuItem value="Oman">Oman</MenuItem>
                  <MenuItem value="Pakistan">Pakistan</MenuItem>
                  <MenuItem value="Palau">Palau</MenuItem>
                  <MenuItem value="Palestinian Territory, Occupied">Palestine</MenuItem>
                  <MenuItem value="Panama">Panama</MenuItem>
                  <MenuItem value="Papua New Guinea">Papua New Guinea</MenuItem>
                  <MenuItem value="Paraguay">Paraguay</MenuItem>
                  <MenuItem value="Peru">Peru</MenuItem>
                  <MenuItem value="Philippines">Philippines</MenuItem>
                  <MenuItem value="Pitcairn">Pitcairn Islands</MenuItem>
                  <MenuItem value="Poland">Poland</MenuItem>
                  <MenuItem value="Portugal">Portugal</MenuItem>
                  <MenuItem value="Puerto Rico">Puerto Rico</MenuItem>
                  <MenuItem value="Qatar">Qatar</MenuItem>
                  <MenuItem value="Reunion">Réunion</MenuItem>
                  <MenuItem value="Romania">Romania</MenuItem>
                  <MenuItem value="Russian Federation">Russia</MenuItem>
                  <MenuItem value="Rwanda">Rwanda</MenuItem>
                  <MenuItem value="Saint Barthelemy">St. Barthélemy</MenuItem>
                  <MenuItem value="Saint Helena">St. Helena</MenuItem>
                  <MenuItem value="Saint Kitts and Nevis">St. Kitts & Nevis</MenuItem>
                  <MenuItem value="Saint Lucia">St. Lucia</MenuItem>
                  <MenuItem value="Saint Martin">St. Martin</MenuItem>
                  <MenuItem value="Saint Pierre and Miquelon">St. Pierre & Miquelon</MenuItem>
                  <MenuItem value="Saint Vincent and the Grenadines">St. Vincent & Grenadines</MenuItem>
                  <MenuItem value="Samoa">Samoa</MenuItem>
                  <MenuItem value="San Marino">San Marino</MenuItem>
                  <MenuItem value="Sao Tome and Principe">São Tomé & Príncipe</MenuItem>
                  <MenuItem value="Saudi Arabia">Saudi Arabia</MenuItem>
                  <MenuItem value="Senegal">Senegal</MenuItem>
                  <MenuItem value="Serbia">Serbia</MenuItem>
                  <MenuItem value="Serbia and Montenegro">Serbia</MenuItem>
                  <MenuItem value="Seychelles">Seychelles</MenuItem>
                  <MenuItem value="Sierra Leone">Sierra Leone</MenuItem>
                  <MenuItem value="Singapore">Singapore</MenuItem>
                  <MenuItem value="Sint Maarten">Sint Maarten</MenuItem>
                  <MenuItem value="Slovakia">Slovakia</MenuItem>
                  <MenuItem value="Slovenia">Slovenia</MenuItem>
                  <MenuItem value="Solomon Islands">Solomon Islands</MenuItem>
                  <MenuItem value="Somalia">Somalia</MenuItem>
                  <MenuItem value="South Africa">South Africa</MenuItem>
                  <MenuItem value="South Georgia and the South Sandwich Islands">South Georgia & South Sandwich Islands</MenuItem>
                  <MenuItem value="South Sudan">South Sudan</MenuItem>
                  <MenuItem value="Spain">Spain</MenuItem>
                  <MenuItem value="Sri Lanka">Sri Lanka</MenuItem>
                  <MenuItem value="Sudan">Sudan</MenuItem>
                  <MenuItem value="Suriname">Suriname</MenuItem>
                  <MenuItem value="Svalbard and Jan Mayen">Svalbard & Jan Mayen</MenuItem>
                  <MenuItem value="Swaziland">Eswatini</MenuItem>
                  <MenuItem value="Sweden">Sweden</MenuItem>
                  <MenuItem value="Switzerland">Switzerland</MenuItem>
                  <MenuItem value="Syrian Arab Republic">Syria</MenuItem>
                  <MenuItem value="Taiwan, Province of China">Taiwan</MenuItem>
                  <MenuItem value="Tajikistan">Tajikistan</MenuItem>
                  <MenuItem value="Tanzania, United Republic of">Tanzania</MenuItem>
                  <MenuItem value="Thailand">Thailand</MenuItem>
                  <MenuItem value="Timor-Leste">Timor-Leste</MenuItem>
                  <MenuItem value="Togo">Togo</MenuItem>
                  <MenuItem value="Tokelau">Tokelau</MenuItem>
                  <MenuItem value="Tonga">Tonga</MenuItem>
                  <MenuItem value="Trinidad and Tobago">Trinidad & Tobago</MenuItem>
                  <MenuItem value="Tunisia">Tunisia</MenuItem>
                  <MenuItem value="Turkey">Turkey</MenuItem>
                  <MenuItem value="Turkmenistan">Turkmenistan</MenuItem>
                  <MenuItem value="Turks and Caicos Islands">Turks & Caicos Islands</MenuItem>
                  <MenuItem value="Tuvalu">Tuvalu</MenuItem>
                  <MenuItem value="Uganda">Uganda</MenuItem>
                  <MenuItem value="Ukraine">Ukraine</MenuItem>
                  <MenuItem value="United Arab Emirates">United Arab Emirates</MenuItem>
                  <MenuItem value="United Kingdom">United Kingdom</MenuItem>
                  <MenuItem value="United States">United States</MenuItem>
                  <MenuItem value="United States Minor Outlying Islands">U.S. Outlying Islands</MenuItem>
                  <MenuItem value="Uruguay">Uruguay</MenuItem>
                  <MenuItem value="Uzbekistan">Uzbekistan</MenuItem>
                  <MenuItem value="Vanuatu">Vanuatu</MenuItem>
                  <MenuItem value="Venezuela">Venezuela</MenuItem>
                  <MenuItem value="Viet Nam">Vietnam</MenuItem>
                  <MenuItem value="Virgin Islands, British">British Virgin Islands</MenuItem>
                  <MenuItem value="Virgin Islands, U.s.">U.S. Virgin Islands</MenuItem>
                  <MenuItem value="Wallis and Futuna">Wallis & Futuna</MenuItem>
                  <MenuItem value="Western Sahara">Western Sahara</MenuItem>
                  <MenuItem value="Yemen">Yemen</MenuItem>
                  <MenuItem value="Zambia">Zambia</MenuItem>
                  <MenuItem value="Zimbabwe">Zimbabwe</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={6}>

            </Grid>

            <Grid item xs={6}>
              <Button 
                type="submit" 
                variant="outlined" 
                startIcon={<Send />} 
                size="large"
                sx={{
                  marginRight:'20px'
                }}
                onClick={handleSubmit}
              >
                Submit
              </Button>
              <Button 
                type="reset" 
                variant="outlined"  
                startIcon={<Clear />}
                size="large"
              >
                Annuler
              </Button>
            </Grid>

          </Grid>
        </form>
      </div>
    </Paper>
  </Box>
  )
}

export default PortForm