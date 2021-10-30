import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import categories from '../data/category'
import countries from '../data/countries';





export default function SwipeableTemporaryDrawer({ setCategory, setCountry, country }) {
  const [state, setState] = React.useState({
    left: false,
  });

  //-------------Dark Theme for Drawner
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );
  //-------------End-------------

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >

      <List>
        <ListItem> {categories[country]["country"]} </ListItem>
      </List>
      <Divider />
      <List>
      {countries.map((text) => (
          <ListItem button key={text} onClick={() => setCountry(text)}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
       </List>

      <List>
        <ListItem>  {categories[country]["category"]} </ListItem>
      </List>

      <Divider />
      <List>
     
        {//for text
          Object.keys(categories[country]["categories"][0]).map((text) => (
          <ListItem button key={text} onClick={() => setCategory(categories[country]["categories"][0][text]) /*for api key*/}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>

    </Box>
  );

  return (
    <div>
      <ThemeProvider theme={theme}>
        <React.Fragment key={'left'}>
          <Button onClick={toggleDrawer('left', true)}><MenuIcon /></Button>
          <SwipeableDrawer
            anchor={'left'}
            open={state['left']}
            onClose={toggleDrawer('left', false)}
            onOpen={toggleDrawer('left', true)}
          >
            {list('left')}
          </SwipeableDrawer>
        </React.Fragment>
      </ThemeProvider>
    </div>
  );
}