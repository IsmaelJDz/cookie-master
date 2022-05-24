import {
  Button,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React, { FC } from "react";
import { Layout } from "../components/layouts";

import Cookies from "js-cookie";
import { GetServerSideProps } from "next";
import axios from "axios";

interface Props {
  theme: string;
}

export const ThemeChangerPage: FC<Props> = ({ theme }) => {
  const [currentTheme, setTheme] = React.useState(theme);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTheme(event.target.value);

    Cookies.set("theme", event.target.value);
  };

  const handleRequest = async () => {
    const { data } = await axios.get("/api/hello");
    console.log("data", data);
  };

  // React.useEffect(() => {
  //   console.log("Cookie", Cookies.get("theme"));
  // }, []);

  return (
    <Layout>
      <Card>
        <CardContent>
          <FormControl>
            <FormLabel>Theme</FormLabel>
            <RadioGroup value={currentTheme} onChange={handleChange}>
              <FormControlLabel
                value="light"
                control={<Radio />}
                label="Light"
              />
              <FormControlLabel value="dark" control={<Radio />} label="Dark" />
              <FormControlLabel
                value="custom"
                control={<Radio />}
                label="Custom"
              />
            </RadioGroup>
          </FormControl>
          <Button onClick={handleRequest}>Request</Button>
        </CardContent>
      </Card>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { theme = "light" } = req.cookies;

  const validThemes = ["light", "dark", "custom"];

  return {
    props: {
      theme: validThemes.includes(theme) ? theme : "dark",
    },
  };
};

export default ThemeChangerPage;
