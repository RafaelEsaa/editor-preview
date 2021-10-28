import React, { useState } from 'react';
import EditorHtml from './components/EditorHtml/EditorHtml';
import EditorCss from './components/EditorCss/EditorCss';
import { Grid, Box, Tabs, Tab, Typography } from '@mui/material';
import { createGlobalStyle } from 'styled-components';

const App = () => {
    const [render, setRender] = useState('');
    const [data, setData] = useState('');
    const [value, setValue] = useState(0);
    const [cssValue, setCssValue] = useState('');
    const GlobalStyles = createGlobalStyle`
        ${cssValue}
    `;

    const testObject = {
        employer: 'Rafael',
        company: 'Sistran',
        jonn: 'holamundo'
    }

    const onGetDataToRender = (dataRender, data) => {
        setRender(dataRender)
        setData(data)
    }

    const onGetCssValue = (css) => {
        setCssValue(css)
    }

    const handleChange = (event, newValue) => {
        console.log('newValue: ', newValue)
        setValue(newValue);
    };

    const TabPanel = (props) => {
        const { children, value, index, ...other } = props;
      
        return (
          <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
          >
            {value === index && (
              <Box sx={{ p: 3 }}>
                <Grid>{children}</Grid>
              </Box>
            )}
          </div>
        );
    }

    return (
        <div>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange}>
                        <Tab label="Editor"/>
                        <Tab label="Preview"/>
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <Grid container>
                        <Grid item xs={6}>
                            <Typography>HTML</Typography>
                            <EditorHtml onGetDataToRender={(dataRender, data) => onGetDataToRender(dataRender, data)} dataObj={testObject} data={data}/>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>CSS</Typography>
                            <EditorCss onGetCssValue={(dataCss) => onGetCssValue(dataCss)} data={cssValue}/>
                        </Grid>
                    </Grid>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <GlobalStyles />
                    <div dangerouslySetInnerHTML={{__html: render}}></div>
                </TabPanel>
            </Box>
        </div>
    );
}
 
export default App;