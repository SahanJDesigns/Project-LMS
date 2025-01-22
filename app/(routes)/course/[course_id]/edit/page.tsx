'use client';
import CoursePage from "./coursePage";
import { StateProvider } from "./StateContext";

const Page = () => {
    return (
        <StateProvider>
            <CoursePage />
        </StateProvider>
    );
}

export default Page;