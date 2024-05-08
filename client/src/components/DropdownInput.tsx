import React, { FC } from "react";
import { IonItem, IonInput, IonSelect, IonSelectOption } from "@ionic/react";
import { Controller, Control } from "react-hook-form";

export interface InputProps {
  name: string;
  placeHolder: string;
  label: string;
  control?: Control;
  options?: string[];
}

const DropdownInput: FC<InputProps> = ({ name, placeHolder, label, control, options }) => {
  return (
    <IonItem className="border-2 border-solid border-black my-3">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <IonSelect value={field.value} label={label} placeholder={placeHolder} onIonChange={e => field.onChange(e.detail.value)}>
            {options?.map((option, index) => (
              <IonSelectOption key={index} value={option}>
                {option}
              </IonSelectOption>
            ))}
          </IonSelect>
        )}
      />
    </IonItem>
  );
};

export default DropdownInput;
