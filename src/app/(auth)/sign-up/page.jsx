"use client";
import React from 'react';

import {
  Button,
  Description,
  FieldError,
  FieldGroup,
  Fieldset,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";

import { signUp } from '../../../lib/auth-client';
const SignUp = () => {
  const onSubmit = async (e) => {
    e.preventDefault();
    
   
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name")?.toString();
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();

    console.log("Form Data:", { name, email, password });
    const { data: signUpData, error } = await signUp.email({
      name: name,
      email: email,
      password: password,
      callbackURL: "/",
    });

   
    if (error) {
      alert(error.message || "Sign up failed!");
      return;
    }
    console.log("Sign Up Data:", signUpData);
    alert("Account created successfully!");
  };

  return (
    <div className="p-6">
      <h1 className="text-xl mb-4">Sign Up Page</h1>
      <Form className="w-full max-w-96" onSubmit={onSubmit}>
        <Fieldset>
          <Fieldset.Legend>Profile Settings</Fieldset.Legend>
          <Description>Update your profile information.</Description>
          
          <FieldGroup>
           
            <TextField
              isRequired
              validate={(value) => {
                if (value.length < 3) {
                  return "Name must be at least 3 characters";
                }
                return null;
              }}
            >
              <Label>Name</Label>
              <Input name="name" placeholder="John Doe" />
              <FieldError />
            </TextField>

           
            <TextField isRequired>
              <Label>Email</Label>
              <Input name="email" type="email" placeholder="john@example.com" />
              <FieldError />
            </TextField>

           
            <TextField
              isRequired
              validate={(value) => {
                if (value.length < 8) {
                  return "Password must be at least 8 characters";
                }
                return null;
              }}
            >
              <Label>Password</Label>
              <Input
                name="password"
                type="password"
                placeholder="Enter your password..."
              />
              <Description>Minimum 8 characters</Description>
              <FieldError />
            </TextField>
          </FieldGroup>

          <Fieldset.Actions className="mt-4">
            <Button type="submit">
              Save changes
            </Button>
            <Button type="reset" variant="secondary">
              Cancel
            </Button>
          </Fieldset.Actions>
        </Fieldset>
      </Form>
    </div>
  );
};

export default SignUp;