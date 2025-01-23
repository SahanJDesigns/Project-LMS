'use client';
import CoursePage from "./coursePage";
import { StateProvider } from "./stateContext";

const Page = () => {
    return (
        <StateProvider>
            <CoursePage />
        </StateProvider>
    );
}

export default Page;