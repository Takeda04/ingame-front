import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {FC} from "react";
import ReactPlayer from 'react-player'
import CloseIcon from '@/ui/icons/close-icon';
import {IconButton} from '@mui/material';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 452,
    width: "100%",
    height: 804
};

interface IWhyChooseUsItemModalProps {
    isOpen: boolean;
    onClose: () => void;
    video: string;
}

const WhyChooseUsItemModal: FC<IWhyChooseUsItemModalProps> = ({
                                                                  isOpen,
                                                                  onClose,
                                                                  video
                                                              }) => {

    const getVideoUrl = () => {
        try {
            const domainUrl = process.env.NEXT_PUBLIC_API_DOMAIN;
            const url = new URL(video);
            const pathAfterDomain = url.pathname;
            return `${domainUrl}/${pathAfterDomain}`;
        } catch (e) {
            console.log(e);
            return "";
        }
    }

    return (
        <>
            <Modal
                open={isOpen}
                onClose={onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    sx={{
                        ...style,
                    }}
                >
                    <IconButton
                        sx={{
                            position: "absolute",
                            top: "5px",
                            right: "5px",
                            zIndex: 100
                        }}
                        onClick={onClose}
                    >
                        <CloseIcon
                            sx={{
                                fontSize: 14,
                                "& path": {
                                    fill: "#ffffff",
                                }
                            }}
                        />
                    </IconButton>
                    <Box
                        sx={{
                            margin: "0 10px",
                            width: "100%",
                            height: "100%",
                            background: "#000000"
                        }}
                    >
                        <ReactPlayer
                            controls
                            url={getVideoUrl()}
                            width="100%"
                            height="100%"
                        />
                    </Box>
                </Box>
            </Modal>
        </>
    );
}

export default WhyChooseUsItemModal;