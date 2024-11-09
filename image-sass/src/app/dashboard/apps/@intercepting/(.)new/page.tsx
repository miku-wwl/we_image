import { Dialog, DialogContent } from "@/components/ui/Dialog";
import CreateApp from "../../new/page";
import BackableDialog from "./BackableDialog";

export default function InterceptingCreateApp() {
    return (
        <BackableDialog>
            <DialogContent>
                <CreateApp></CreateApp>
            </DialogContent>
        </BackableDialog>
    );
}
